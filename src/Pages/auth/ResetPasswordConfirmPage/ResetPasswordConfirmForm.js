import React, {useState} from "react";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import useIsMountedRef from "../../../hooks/useIsMountedRef";
import { resetPasswordConfirm } from "../../../store/actions/auth";
import *as constant from '../../../constants';

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

const ResetPasswordConfirmPage = ({
  className,
  match,
  resetPasswordConfirm,
  ...rest
}) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [requestSent, setRequestSent] = useState(false);

  
  if (requestSent) {
    return <Redirect to='/login' />
  }

  return (
    <>
      <Formik
        initialValues={{
          password: "",
          re_password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .min(7)
            .max(255)
            .required("lLe Mot de passe est obligatoite"),
          re_password: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const uid = match.params.uid;
            const token = match.params.token;
            

            resetPasswordConfirm(
              uid,
              token,
              values.password,
              values.re_password
            );

            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
            setRequestSent(true);

          } catch (err) {
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
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
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
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
                { constant.R_MPASS}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

ResetPasswordConfirmPage.propTypes = {
  className: PropTypes.string,
  resetPasswordConfirm: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirmPage);
