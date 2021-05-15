import React from 'react';
import "../styles/signup.scss";
import { postUser, postRequest, showNewVocab } from '../actions';
import { connect } from 'react-redux';
import { API_URL } from '../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons'

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
            },
            error: "",
            users: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async getAllUsers(){
        try {
            const res = await axios.get(`${API_URL}/api/users`)
            if (res.data.length > 0){
                this.setState({ users: res.data })
            }
        } catch (err){
            console.error(err)
        }
    }

    componentDidMount(){
        this.getAllUsers()
    }

    isUnique(toCheckHeader, toCheck){
        const { users } = this.state
        if (users.length > 0){
            for (let i = 0; i < users.length; i++){
                if (users[i][toCheckHeader] === toCheck){
                    return false
                }
            }
        }

        return true
    }

    handleChange(e){
        this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    handleSubmit(e){
        e.preventDefault() 
        if (this.state.user.zoomID.toString().length !== 10){
            this.setState({error: "zoomID has to be 10 digits"})
        } else  if (!this.isUnique("zoomID", this.state.user.zoomID)){
            this.setState({error: "zoomID was already taken, you may want to login"})
        } else if (!this.isUnique("email", this.state.user.email)){
            this.setState({error: "Email was already taken, you may want to login"})
        } else {
            console.log('in else')
            this.props.postUser(this.state.user, this.props.history)
        }

        setTimeout(this.props.showNewVocab.bind(this), 10000)

    }


    render(){

        console.log('props in signup', this.props)
        //if a user wants to create an account from scratch, it should not lead him to times sheet

        // const userId = this.props.state.request.user_id
        // const token = localStorage.getItem('token')
        // if (userId > 0 || token){
        //     this.props.history.push('/times')
        // }

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
                            className="first_name"
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
                            type="number"
                            name="zoomID"
                            onChange={this.handleChange}
                            required
                        />
                        <FontAwesomeIcon
                            icon={faInfoCircle} 
                            className="info-icon"
                        />
                        <div className="info">
                            Zoom is a video conferencing tool you will be using to practice speaking with your buddy
                            <a href="https://zoom.us/signup" style={{ color: "orange"}}> sign up Zoom</a>
                        </div>
                    </div>
                    {this.state.error.length > 0
                    ? <p style={{ color: "red", fontSize: "14px", fontStyle: "italic"}}>{this.state.error}</p>
                    : null}
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

export default connect(mapStateToProps, { postUser, postRequest, showNewVocab })(SignUp);