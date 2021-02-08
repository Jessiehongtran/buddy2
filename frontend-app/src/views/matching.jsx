import React from 'react';
import { API_URL } from '../config';
import { connect } from 'react-redux';
import '../styles/matching.scss'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { updateCallInfo } from '../actions';

class Matching extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            toMatch: {},
            matchedZoomID: ""
        }
    }

    

    componentDidMount(){
        //get request by id then update toMatch or use redux persistent
        //but request_id should be stored in localStorage or sessionStorage
        const request_id = this.props.state.request_id
        Axios.get(`${API_URL}/api/requests/${request_id}`)
            .then(res => {
                console.log(res.data)
                this.setState({toMatch: res.data})
            })
            .catch(err => {
            console.log(err.message)
        })

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

    showZoomLink(meetingTime){
        let now = new Date();
        let millisTillMeeting = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21,5,0,0 ) - now

        setTimeout(function(){
            alert("It's 9:30pm!")
        }, millisTillMeeting);
    }

    render(){
        const { toMatch, matchedZoomID } = this.state

        const matches = []

        for (let i = 0; i < this.state.requests.length; i ++){
            if (toMatch.user_id !== this.state.requests[i].user.user_id && 
                this.isUniqueUser(matches, this.state.requests[i].user.user_id) &&
                toMatch.timeSlotInteger == this.state.requests[i].timeSlotInteger &&    
                this.topicMatched(this.props.state.topics, this.state.requests[i].topic) &&
                !this.state.requests[i].matched ){
                
                matches.push(this.state.requests[i])
                //update matched in the request to true in database
                this.updateMatch(this.state.requests[i].id)
            }
        }


        if (matches.length > 0){
            //if there is a match,  update matched of this new request as 'true'
            this.updateMatch(this.props.state.request_id)
            const uuid = uuidv4()
            //showZoomLink()
           
            return (
                <div className="matching-container">
                    <h2>You've been MATCHED</h2>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Topics</th>
                            <th>Join</th>
                        </tr>
                        <tr>
                            <td>{matches[0].user.first_name + " " + matches[0].user.last_name}</td>
                            <td>{matches[0].day.date}</td>
                            <td>{matches[0].time.timeslot + matches[0].time.ampm}</td>
                            <td>{matches[0].topic.topic_name}</td>
                            <td><a href={`https://meet.jit.si/${uuid}`}>Join call</a></td>
                        </tr>
                    </table>
                    
                    {matchedZoomID.length > 0
                    ? <a href=""><p>Meet your buddy</p></a>
                    : null}
                
                </div>
            )
        }
        else {
            return (
                <div className="matching-container">
                    <div className="sad-icon">
                        <img src="https://image.flaticon.com/icons/png/512/260/260250.png"/>
                    </div>
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

export default connect(mapStateToProps, { updateCallInfo })(Matching);