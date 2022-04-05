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
  Grid,
  FormHelperText,
  TextField,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
import { signupSuccess } from "../../../../store/actions/auth";
import axios from "axios";
import * as constant from "../../../../constants";
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
          first_name: "",
          last_name: "",
          phone:value,
          email: "",
          password: "",
          re_password: "",
          policy: true,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required("Votre prenom est obligatoire"),
          last_name: Yup.string().required("Votre nom est obligatoire"),
          email: Yup.string()
            .email("ça doit être un e-mail valide")
            .max(255)
            .required("Votre email est obligatoire"),
          password: Yup.string()
            .min(7)
            .max(255)
            .required("Votre mot de passe est obligatoire"),
          re_password: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "les mots de passe doivent correspondre"
          ),
          policy: Yup.boolean().oneOf([true], "Ce champ doit être coché"),
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
              password,
              re_password,
              first_name,
              last_name,
            } = values;
            const body = JSON.stringify({
              first_name,
              last_name,
              email,
              password,
              re_password,
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
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  label="Prénom"
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  label="Nom"
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Box mt={2}>
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
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Mot de Passe"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.re_password && errors.re_password)}
                fullWidth
                helperText={touched.re_password && errors.re_password}
                label="Confirmez le mot de passe"
                margin="normal"
                name="re_password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.re_password}
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
                {constant.ENREGISTRE}
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
