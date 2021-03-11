import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class ProtectedRoute extends React.Component {

    render(){
        const Component = this.props.component;

        console.log('props in protected rout', this.props)

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