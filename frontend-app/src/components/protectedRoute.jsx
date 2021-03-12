import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


// class ProtectedRoute extends React.Component {

//     render(){
//         const Component = this.props.component;
//         console.log('props in protected', this.props)

//         return localStorage.getItem('isAuth') ? (
//             <Component props={this.props}/>
//         ) : (
//             <Redirect to={{ pathname: '/login' }} />
//         )
//     }
// }

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render = {(props) => (
        localStorage.getItem('isAuth') 
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