import React from 'react';
import "../styles/signup.scss"

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
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
        console.log('submitted')
        console.log(this.state.user)
    }

    render(){
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
                                name="firstName"
                                onChange={this.handleChange}
                            />
                            <input 
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="row">
                            <input 
                                placeholder="Email"
                                type="email"
                                name="email"
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

export default SignUp;