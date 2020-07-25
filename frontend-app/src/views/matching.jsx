import React from 'react';
import { API_URL } from '../config';
import { connect } from 'react-redux';
import Axios from 'axios';

class Matching extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requests: []
        }
    }

    componentDidMount(){
        Axios.get(`${API_URL}/api/requests`)
             .then(res => {
                 console.log(res.data)
                 this.setState({requests: res.data})
             })
             .catch(err => {
                console.log(err.message)
            })
    }

    topicMatched(topics, topic){
        for (let i =0; i<topics.length; i++){
            if (topics[i].id === topic.topic_id){
                return true
            }
        }
        return false
    }

    render(){
        console.log('check state in matching', this.props.state)
        const toMatch = this.props.state

        const matches = []

        for (let i = 0; i < this.state.requests.length; i ++){
            if (toMatch.request.user_id !== this.state.requests[i].user.user_id && 
                toMatch.request.date == this.state.requests[i].day.date && 
                toMatch.request.time_id == this.state.requests[i].time.time_id && 
                toMatch.request.timezone_id == this.state.requests[i].timezone.timezone_id &&
                this.topicMatched(toMatch.topics, this.state.requests[i].topic) &&
                !this.state.requests[i].matched ){

                //make sure a user is unique
                
                matches.push(this.state.requests[i])
                //if there is a match, push toMatch to database with matched update as 'true'
                //update matched in the request to true in database
                
            }
        }

        console.log('matched', matches)

        return (
            <div>
                {matches.map(eachMatch => 
                <div>
                    You are matched with this user: {eachMatch.user.email}
                </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {  })(Matching);