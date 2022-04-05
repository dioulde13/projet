import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, access, user },
//   ...rest
}) => {
  return <Route
    // {...rest}
    render={(props) =>
      !access && !loading ? <Redirect to="/becominginstructor" /> : <Component {...props} />
    }
  />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
