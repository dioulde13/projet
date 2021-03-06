import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import { Box, Container } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {}
}));

const General = ({ className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box mt={4}/>
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ProfileDetails user={user} />
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <GeneralSettings user={user} />
      </Grid>
    </Grid>
    <Box mb={4}/>
    </Container>
  );
}

General.propTypes = {
  className: PropTypes.string
};

export default General;
