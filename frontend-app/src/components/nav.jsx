import React, {Component} from 'react';
import '../styles/nav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../config';
import { connect } from 'react-redux';
import { logOut } from '../actions';

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            initials: "",
            email: "",
            // showAccount: false
        }
        this.toggleShowAccount = this.toggleShowAccount.bind(this)
        this.getAccountByUserId = this.getAccountByUserId.bind(this)
    }

    componentDidMount(){
        this.getAccountByUserId()
    }

    async getAccountByUserId(){
        const userId = localStorage.getItem('userId')
        if (userId){
            try {
                const res = await axios.get(`${API_URL}/api/users/${userId}`)
                if (res.data){
                    this.setState({ 
                        username: res.data.first_name + " " + res.data.last_name,
                        initials: res.data.first_name[0] + res.data.last_name[0],
                        email: res.data.email
                    })
                }
            } catch (err){
                console.error(err)
            }
        } 
    }

    toggleShowAccount(){
        this.setState({ showAccount: !this.state.showAccount })
    }


    render(){
        const { initials, username, email } = this.state;

        if (this.props.state.authenticated){
            setTimeout(function(){
                this.props.logOut(!this.props.state.showAccount, this.props.history)
            }.bind(this), 60000*30)
        }

        return (
            <div className="nav">
                <div className="logo">
                    <h1>Buddy</h1>
                </div>
                <div className="navigation">
                    <a href="/" style={{ cursor: 'pointer' }}>Home</a>
                    {this.props.state.authenticated
                    ? <div style={{ display: 'flex' }}>
                        <div className="logout" style={{ marginRight: '20px'}} onClick={() => this.props.logout(!this.props.state.showAccount, this.props.history)}>Log Out</div>
                        <a href="/times" style={{ cursor: 'pointer' }}>Find a buddy</a>
                      </div>
                    : <a href="/login">Login</a>
                    }
                    {this.props.state.authenticated 
                    ? <a href="/mymatch">My Matches</a>
                    : <button className="getStarted-btn" onClick={() => this.props.history.push('/signup')}>Get started</button>
                    }
                    <div className="account">
                        <FontAwesomeIcon
                            className="account-icon"
                            icon={faUserCircle} 
                            onClick={() => this.toggleShowAccount()}
                        />
                        {this.props.state.showAccount 
                        ? email.length > 0 
                            ? <div className="account-detailed" style={{ position: 'absolute', backgroundColor: 'white', padding: '60px 20px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="email-container" style={{ display: 'flex' }}>
                                    <div className="name-initial" style={{ backgroundColor: 'blue', borderRadius: '50%', padding: '10px', marginRight: '20px', color: 'white'}}>
                                        {initials}
                                    </div>
                                    <div className="content">
                                        <div className="name" style={{ fontWeight: 'bold', marginBottom: '5px'}}>
                                            {username}
                                        </div>
                                        <div className="email" style={{ fontSize: '14px' }}>
                                            {email}
                                        </div>
                                    </div>
                                    <div className="collapse-icon">

                                    </div>
                                </div>
                                <button 
                                    style={{ marginTop: '20px', width: '80%', backgroundColor: 'blue', color: 'white', borderRadius: '8px', fontSize: '16px', padding: '8px 15px', border: 'none'}}
                                    onClick={() => this.props.logout()}
                                >Sign Out</button>
                            </div>
                            : alert("Please sign in/sign up")
                        : null}
                    </div>
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

export default connect(mapStateToProps, { logOut })(Nav);