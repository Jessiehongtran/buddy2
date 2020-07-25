import React from 'react';
import { API_URL } from '../config';
import { connect } from 'react-redux';
import '../styles/matching.scss'
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

    isUniqueUser(matches, user_id){
        if (matches.length === 0){
            return true
        }
        for (let i=0; i<matches.length; i++){
            if (user_id == matches[i].user.user_id){
                return false
            }
        }

        return true

    }

    updateMatch(request_id){
        Axios.patch(`${API_URL}/api/requests/${request_id}`, {
            matched: true
                })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    render(){
        console.log('check state in matching', this.props.state)
        const toMatch = this.props.state

        const matches = []

        for (let i = 0; i < this.state.requests.length; i ++){
            if (toMatch.request.user_id !== this.state.requests[i].user.user_id && 
                this.isUniqueUser(matches, this.state.requests[i].user.user_id) &&
                toMatch.request.date == this.state.requests[i].day.date && 
                toMatch.request.time_id == this.state.requests[i].time.time_id && 
                toMatch.request.timezone_id == this.state.requests[i].timezone.timezone_id &&
                this.topicMatched(toMatch.topics, this.state.requests[i].topic) &&
                !this.state.requests[i].matched ){
                
                matches.push(this.state.requests[i])
                //update matched in the request to true in database
                this.updateMatch(this.state.requests[i].id)
            }
        }

        if (matches.length > 0){
            //if there is a match,  update matched of this new request as 'true'
            this.updateMatch(this.props.state.request_id)

            return (
                <div className="matching-container">
                    <h2>You've been MATCHED with these awesome buddies</h2>
                    {matches.map(eachMatch => 
                    <p>
                        {eachMatch.user.first_name + " " + eachMatch.user.last_name}
                    </p>
                    )}
                </div>
            )
        }
        else {
            return (
                <div className="matching-container">
                    <h2>There is no match for you currently, we will notify you if there is one
                    </h2>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {  })(Matching);