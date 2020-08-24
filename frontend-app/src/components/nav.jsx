import React, {Component} from 'react';
import '../styles/nav.scss'

class Nav extends Component {
    render(){
        return (
 
            <div className="nav">
                <div className="logo">
                    <h1>Buddy</h1>
                </div>
                <div className="navigation">
                    <a href="">Login</a>
                    <button>Get started</button>
                </div>
            </div>
        )
    }
}

export default Nav;