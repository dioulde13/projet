import React, { useState } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { signupSuccess } from "../../../../store/actions/auth";
import axios from "axios";
import { useSnackbar } from "notistack";
import 'react-phone-number-input/style.css'


const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    marginLeft: "2px",
  },
  googleButton: {
    backgroundColor: theme.palette.common.white,
  },
  providerIcon: {
    marginRight: theme.spacing(2),
  },
  divider: {
    flexGrow: 1,
  },
  dividerText: {
    margin: theme.spacing(2),
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const RegisterPage = ({
  className,
  isAuthenticated,
  // error,
  signupSuccess,
  ...rest
}) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState();
  return (
    <>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={Yup.object().shape({
          
          search: Yup.string()
            .email("ça doit être un e-mail valide")
            .max(255)
            .required("Search est obligatoire"),
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
            const {
              search,
             
            } = values;
            const body = JSON.stringify({
             
              search,
             
            });
            const res = await axios.post(
              `${process.env.REACT_APP_API_URL}/auth/users/`,
              body,
              config
            );
            resetForm();
            signupSuccess(res.data);
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar(
                "Veillez consulter votre Email pour activer votre compte",
                {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  TransitionComponent: Collapse,
                }
              );
            }
          } catch (err) {
            if (err.response) {
              if (isMountedRef.current) {
                setStatus({ success: false });
                if (err.response.data.password)
                  setErrors({ submit: err.response.data.password[0] });
                else if (err.response.data.email)
                  if (
                    err.response.data.email[0] ===
                    "Un objet user account avec ce champ email existe déjà."
                  )
                    setErrors({
                      submit: "Un compte avec ce email existe déjà",
                    });
                setSubmitting(false);
                enqueueSnackbar("veillez verifier vos informations", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  TransitionComponent: Collapse,
                });
              }
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <Box mt={2}>
              <TextField
                error={Boolean(touched.search && errors.search)}
                fullWidth
                helperText={touched.search && errors.search}
                label="Search"
                margin="normal"
                name="search"
                onBlur={handleBlur}
                onChange={handleChange}
                type="submit"
                value={values.search}
                variant="outlined"
              />
              
            </Box>

            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>{errors.policy}</FormHelperText>
            )}
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
               Search
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

RegisterPage.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // error: state.auth.error,
});

export default connect(mapStateToProps, { signupSuccess })(RegisterPage);
