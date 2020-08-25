import React, {Component} from 'react';
import { updateEmail } from '../actions';
import { connect } from 'react-redux';
import '../styles/home.scss';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ""
        }
        
        this.handlechange = this.handlechange.bind(this)
        this.getStarted = this.getStarted.bind(this)
    }


    handlechange(e){
        this.setState({email: e.target.value})
    }

    getStarted(e){
        e.preventDefault()
        this.props.updateEmail(this.state.email)
        this.props.history.push('/signup')
    }

    render(){
        console.log('props in home', this.props)
        return (
            <div className="home">
                <div className="left">
                    <p className="position">Wanna practice speaking English but don't have a buddy?</p>
                    <p className="explain">Practice makes better</p>
                    <div className="get-started">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            onChange= {this.handlechange} 
                        />
                        <button onClick={this.getStarted}>Get started</button>
                    </div>
                </div>
                <div className="right">
                    <img src="https://res.cloudinary.com/dfulxq7so/image/upload/v1598306697/output-onlinepngtools_14_fpyw6h.png"/>
                    
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

export default connect(mapStateToProps, { updateEmail })(Home);