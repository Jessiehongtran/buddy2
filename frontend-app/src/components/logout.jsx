import React from 'react';
import '../styles/logout.scss'

export default class LogOut extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    logout(){
        localStorage.clear();
        this.props.history.push("/")
    }

    render(){
        return (
            <div className="logout" onClick={() => this.logout()}>Log Out</div>
        )
    }
}