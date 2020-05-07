import React, {Component} from 'react';

class Nav extends Component {
    render(){
        return (
            <div>
                <ul className="header">
                    <li><a href="/"></a></li>
                    <li><a href="/stuff">Stuff</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
        )
    }
}

export default Nav;