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
                password: ""
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
        if (userId >0){
            this.props.postRequest(this.props.state.request)
            this.props.history.push('/time')
        }
        
        console.log('props in signup', this.props)

        return (
            <div className="signup">
                <div className="image">
                    <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1593986423/unnamed_oqacur.png"/>
                    <h1>Sign up to speak upppp</h1>
                </div>
                <div className="signup-form">
                    <form onSubmit={this.handleSubmit}>
                    
                        <div className="row">
                            <input 
                                placeholder="First name"
                                type="text"
                                name="first_name"
                                onChange={this.handleChange}
                            />
                            <input 
                                placeholder="Last name"
                                type="text"
                                name="last_name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="row">
                            <input 
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={this.state.user.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="row">
                            <input 
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>Sign up</button>
                    </form>
                </div>
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