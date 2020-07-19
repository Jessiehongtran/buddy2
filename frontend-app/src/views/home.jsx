import React, {Component} from 'react';
import Nav from '../components/nav';
import '../styles/home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        
    }

    

    render(){
        return (
            <div class="home">
                {/* <Nav/> */}
                <p>Practice speaking with a buddy</p>
                <button onClick={() => this.props.history.push('/time')}>Find a buddy</button>
            </div>
        )
    }
}

export default Home;