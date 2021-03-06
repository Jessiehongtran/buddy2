import React from 'react';
import Axios from 'axios';
import '../styles/login.scss'
import { API_URL } from '../config';
import { updateUserID, showNewVocab } from '../actions';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            },
            login_error: ""
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

    async handleSubmit(e){
        e.preventDefault()
        //post for login
        try {
            const res = await Axios.post(`${ API_URL }/api/users/login`, this.state.user)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            localStorage.setItem('isAuth', true)
            this.props.updateUserID(res.data.userId) //doing this but currently mostly rely on local storage so that the data does not disappear due to refresh
            this.props.history.push('/times')
        } catch (err){
            this.setState({ login_error: err.message })
        }

        setTimeout(this.props.showNewVocab.bind(this), 10000)
    }

    render(){
        const { login_error } = this.state;

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
                    { login_error.length > 0
                    ? <p style={{marginTop: '0px', fontStyle: 'italic', fontSize: '14px'}}>Email or password is not valid</p>
                    : null}
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

export default connect(mapStateToProps, { updateUserID, showNewVocab })(Login);