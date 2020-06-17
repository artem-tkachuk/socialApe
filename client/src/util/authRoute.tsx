import React from 'react';
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// @ts-ignore
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
        { ...rest }
        render = { (props) =>
            authenticated === true ? <Redirect to={"/"} /> : <Component {...props } />
        }
    />
);

// @ts-ignore
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(AuthRoute);