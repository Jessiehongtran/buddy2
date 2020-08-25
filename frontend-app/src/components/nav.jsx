import React, {Component} from 'react';
import '../styles/nav.scss'

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return (
 
            <div className="nav">
                <div className="logo">
                    <h1>Buddy</h1>
                </div>
                <div className="navigation">
                    {/* <a href="">Login</a> */}
                    <button onClick={() => this.props.history.push('/signup')}>Get started</button>
                </div>
            </div>
        )
    }
}

export default Nav;