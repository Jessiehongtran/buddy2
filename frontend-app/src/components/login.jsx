import React from 'react';
import Axios from 'axios';
import { API_URL } from '../config';

export default class Login extends React.Component {
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
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    placeholder="Email"
                    type="email" 
                    name="email"
                    onChange={this.handleChange}
                />
                <input
                    placeholder="Password"
                    type="password" 
                    name="password"
                    onChange={this.handleChange}
                />
                <button>Log In</button>
            </form>
        )
    }
}