import React from 'react';
import "../styles/signup.scss";
import { postUser, postRequest } from '../actions';
import { connect } from 'react-redux';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                first_name: "",
                last_name: "",
                email: this.props.state.email,
                password: "",
                zoomID: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    handleSubmit(e){
        e.preventDefault() 
        console.log('user', this.state.user)
        this.props.postUser(this.state.user)
    }


    render(){

        const userId = this.props.state.request.user_id
        const token = localStorage.getItem('token')
        if (userId > 0 || token){
            this.props.postRequest(this.props.state.request)
            this.props.history.push('/times')
        }
        
        console.log('props in signup', this.props)

        return (
            <div className="signup">
                <div className="logo">
                    <h1>Buddy</h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>Sign Up</p>
                    <div className="row">
                        <input 
                            placeholder="First name"
                            type="text"
                            name="first_name"
                            onChange={this.handleChange}
                            required
                        />
                        <input 
                            placeholder="Last name"
                            type="text"
                            name="last_name"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <input 
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={this.state.user.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <input 
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="row">
                        <input 
                            placeholder="Personal Zoom Meeting ID"
                            type="zoomID"
                            name="zoomID"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button>Sign up</button>
                </form>
                <p className="already-member">Already a member? <a href="/login">Log in</a></p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { postUser, postRequest })(SignUp);