import React, { useEffect, useState } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Redirect } from "react-router-dom";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  Collapse,
} from "@material-ui/core";
import { connect } from "react-redux";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { resetPassword } from "../../../store/actions/auth";
import * as constant from "../../../constants";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const ResetPasswordForm = ({ className, resetPassword, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    console.log(requestSent);
  }, [requestSent]);

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Doit être un e-mail valide")
            .max(255)
            .required("Email est requis"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            resetPassword(values.email);
            setSubmitting(true)
            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              setRequestSent(true);
              enqueueSnackbar(
                "Un e-mail vous a été envoyé pour réinitialiser votre mot de passe",
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
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }

          console.log(requestSent);
          if (requestSent) {
            console.log("mdmd");
            return <Redirect to="/" />;
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
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
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
                {constant.R_MPASS}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

ResetPasswordForm.propTypes = {
  className: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPasswordForm);
