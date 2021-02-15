import React from 'react';
import '../styles/logout.scss'

export default class LogOut extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    logout(){
        console.log('a user is logging out')
        localStorage.clear();
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="logout" style={{ marginRight: '20px'}} onClick={() => this.logout()}>Log Out</div>
        )
    }
}