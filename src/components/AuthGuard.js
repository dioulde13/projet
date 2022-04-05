import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { useSelector } from '../store';

const AuthGuard = ({ children, auth: { isAuthenticated, loading, access, user }, }) => {

  

  if (!access && !loading ) {
    return <Redirect to="/becominginstructor" />;
  }

  return (
    <>
      {children}
    </>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthGuard);
