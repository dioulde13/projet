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
  Grid
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
  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("ça doit être un e-mail valide")
            .max(255)
            .required("Votre email est obligatoire"),
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
              email,
            } = values;
            const body = JSON.stringify({
              email,
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
            {/* <Grid container spacing={2}>
              <Grid item md={6} xs={12}> */}
                <Box mt={1}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
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
              {/* </Grid>
              <Grid item md={6} xs={12}> */}
                <Box mt={1}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </Box>
              {/* </Grid>
            </Grid> */}
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
