import React from 'react';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign up to speak up</h3>
                    <div className="name">
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
                    <div>
                        <input 
                            placeholder="Email"
                            type="email"
                            name="email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <input 
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Create account</button>
                </form>
            </div>
        )
    }
}

export default SignUp;