import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {(props) => (
        localStorage.getItem('isAuth') === "true"
        ? <Component {...props}/>
        :<Redirect to={{ pathname: '/login' }} />
    )}

    />
)


const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {})(ProtectedRoute);