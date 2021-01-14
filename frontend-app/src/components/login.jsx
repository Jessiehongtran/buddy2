import React from 'react';
import Axios from 'axios';
import '../styles/login.scss'
import { API_URL } from '../config';
import { updateUserID } from '../actions';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            } 
        })
    }

    handleSubmit(e){
        e.preventDefault()
        //post for login
        console.log(this.state.user)
        Axios.post(`${ API_URL }/api/users/login`, this.state.user)
             .then(res => {
                 console.log(res.data)
                 localStorage.setItem('token', res.data.token)
                 localStorage.setItem('userId', res.data.userId)
                 this.props.updateUserID(res.data.userId)
                 this.props.history.push('/time3')
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    render(){
        return (
            <div className="login">
                <div className="logo">
                    <h1>Buddy</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>Sign In</p>
                    <div className="input-container">
                        <i class="fa fa-envelope icon"></i>
                        <input
                            placeholder="Email"
                            type="email" 
                            name="email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <i class="fa fa-key icon"></i>
                        <input
                            placeholder="Password"
                            type="password" 
                            name="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Sign In</button>
                </form>
                <p className="new-here">New here? <a href="/signup">Create an account</a></p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { updateUserID })(Login);