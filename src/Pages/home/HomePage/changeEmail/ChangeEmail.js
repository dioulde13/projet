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
  Grid,
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



const ChangeEmail = ({
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
          first_name: "",
          last_name: "",
          membership_number:"",
          email: "",
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string()
            .max(255)
            .required("Veillez donner le first_name"),
        last_name: Yup.string()
            .max(255)
            .required("veillez saisir  last_name"),
        membership_number: Yup.string()
            .max(255)
            .required("veillez saisir  membership_number"),
        email: Yup.string().email('ça doit être un e-mail valide').max(255).required('Email est obligatoire'),
    })}
    onSubmit={async (
      values,
      { setErrors, setStatus, setSubmitting }
  ) => {
      try {
          const config = {
              headers: {

                  "Content-Type": "application/json",
                  Authorization: `JWT ${localStorage.getItem("access")}`,
                  Accept: "application/json",
              },
          };
          const { first_name, last_name, membership_number, email } = values;
          const body = JSON.stringify({
              first_name,
              last_name,
              membership_number,
              email,
          });

          const response = await axios.update(
              `http://localhost:8000/emlploye`,
              body,
              config,
          );
          console.log(response);
          if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar("User Create With success ", {
                  variant: "success",
                  anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                  },
                  TransitionComponent: Collapse,
              });
              // handlereturn()
              // refreshPage()

          }
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
            className={clsx(classes.root, className)}
            onSubmit={handleSubmit}
            {...rest}
          >
            <Grid container spacing={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  error={Boolean(touched.first_name && errors.first_name)}
                  fullWidth
                  helperText={touched.first_name && errors.first_name}
                  name="first_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  variant="outlined"
                  label="first_name"
                />
              </Grid>

              <Grid item md={6} xs={6}>
                <TextField
                  error={Boolean(touched.last_name && errors.last_name)}
                  fullWidth
                  helperText={touched.last_name && errors.last_name}
                  name="last_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  variant="outlined"
                  label=" last_name"
                />
              </Grid>
            </Grid>
            <Box mt={2} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                  label=" email"
                />
              </Grid>
            </Grid>
            <Box mt={2} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.membership_number && errors.membership_number)}
                  fullWidth
                  helperText={touched.membership_number && errors.membership_number}
                  name="membership_number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.membership_number}
                  variant="outlined"
                  label=" membership_number"
                />
              </Grid>
            </Grid>

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
                Change
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ChangeEmail;
