import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GuestGuard = ({ children, auth: { isAuthenticated, loading, access, user } }) => {

  if (isAuthenticated && !loading) {
    return <Redirect to="/dashboard/account" />;
  }

  return (
    <>
      {children}
    </>
  );
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});


export default connect(mapStateToProps)(GuestGuard);
