import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  Collapse,
} from '@material-ui/core';
import { connect } from 'react-redux';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { load_user, loginSuccess } from '../../../store/actions/auth';
import *as constant from '../../../constants'
import axios from 'axios';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {},
  googleButton: {
    backgroundColor: theme.palette.common.white
  },
  providerIcon: {
    marginRight: theme.spacing(2)
  },
  divider: {
    flexGrow: 1
  },
  dividerText: {
    margin: theme.spacing(2)
  }
}));

const LoginForm = ({ className, load_user, loginSuccess, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('ça doit être un e-mail valide').max(255).required('Email est obligatoire'),
          password: Yup.string().max(255).required('Mot de passe est obligatoire')
        })}
        onSubmit={async (values, {
          setErrors,
          setStatus,
          setSubmitting
        }) => {
          const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
          try {
            const {
              email,
              password
            } = values;
             const body = JSON.stringify({ email, password });
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`,body, config);
            loginSuccess(res.data)
            load_user();

            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.response.data.detail });
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
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
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
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label="Mot de passe"
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
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
                {constant.CONNEXION}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { load_user, loginSuccess })(LoginForm);
