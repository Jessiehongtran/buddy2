import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class ProtectedRoute extends React.Component {

    render(){
        const Component = this.props.component;

        return this.props.state.authenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {})(ProtectedRoute);