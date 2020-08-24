import React, {Component} from 'react';
import Nav from '../components/nav';
import '../styles/home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        
        this.handlechange = this.handlechange.bind(this)
    }


    handlechange(){

    }

    render(){
        return (
            <div className="home">
                <div className="left">
                    <p className="position">Practice speaking English with a buddy</p>
                    <p className="explain">It's always better to have a buddy</p>
                    <div className="get-started">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            onChange= {this.handlechange} 
                        />
                        <button>Get started</button>
                    </div>
                </div>
                {/* <button onClick={() => this.props.history.push('/time')}>Find a buddy</button> */}
                <div className="right">
                    <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1598306697/output-onlinepngtools_14_fpyw6h.png"/>
                    {/* <div className="demo">
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/5Fzf5kvpq4E" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>

                        </iframe>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default Home;