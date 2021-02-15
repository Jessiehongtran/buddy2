import React from 'react';
import Axios from 'axios';
import { API_URL } from '../config';
import { connect } from 'react-redux';

class Matching2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            requests: [],
            matchedZoomID: ""
        }
    }

    async getAllRequests(){
        Axios.get(`${API_URL}/api/requests`)
             .then(res => {
                console.log('get All requests', res.data)
                 this.setState({requests: res.data})
             })
             .catch(err => {
                console.log(err.message)
            })
    }

    componentDidMount(){
        this.getAllRequests()
    }

    appearIn(el, arr){
        for (let i =0; i < arr.length; i++){
            if (el.id == arr[i].topic_id){
                return true
            }
        }
        return false
    }

    hasSameTopics(topicList1, topicList2){
        let sharedTopicsInString = ""
        for (let i=0; i < topicList1.length; i++){
            if (this.appearIn(topicList1[i], topicList2) ){
                if (sharedTopicsInString.length == 0){
                    sharedTopicsInString += topicList1[i]
                } else {
                    sharedTopicsInString += ", " + topicList1[i]
                }
            }
        }
        return sharedTopicsInString
    }

    async updateMatch(request_id){
        try {
            const res = await Axios.patch(`${API_URL}/api/requests/${request_id}`, {matched: true})
            console.log('update match', res.data)
        } catch (err){
            console.error(err)
        }
    }

    async postMatch(match){
        try {
            const res = await Axios.post(`${API_URL}/api/matches`, match)
            console.log('post match', res.data)
        } catch (err){
            console.error(err)
        }
    }

    hasMatch(){
        const curRequest = this.props.currentRequest;
        const { requests } = this.state;
        curRequest.topics = this.props.selectedTopics;
        const curRequestId = localStorage.getItem('request_id')

        for (let i =0 ; i < requests.length ; i++){
            if (curRequest.timeSlotInteger === requests[i].timeSlotInteger 
                && requests[i].matched === 0 
                && curRequest.user_id !== requests[i].user.user_id //to make sure the request comes from a different user
                && this.hasSameTopics(curRequest.topics, requests[i].topics).length > 0){
                //update match boolean
                this.updateMatch(requests[i].id) 
                this.updateMatch(curRequestId) 
                //send to match table
                const matchToPost = {
                    request1_id: curRequestId,
                    request2_id: requests[i].id,
                    meetingTimeInt: curRequest.timeSlotInteger,
                    topics: this.hasSameTopics(curRequest.topics, requests[i].topics),
                }
                this.postMatch(matchToPost)
                //is 

                return requests[i]
            }
        }

        return null
    }

    //when to call this function though, if call in return, I need the match, where the match can be stored? in database or in localStorage, maybe we need a match table to store matches, and dashboard for each user
    showZoomLink(meetingTime){
        let now = new Date();
        let millisTillMeeting = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21,5,0,0 ) - now

        setTimeout(function(){
            alert("It's 9:30pm!")
        }, millisTillMeeting);
    }


    render(){

        return (
            <div>
                {this.hasMatch()
                ? <div>
                    <p>Matched with buddy #{this.hasMatch().id}</p>
                    <a href="">Meet your buddy</a>
                  </div>
                : <p>There is no buddy available for you :(</p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentRequest: state.request,
        selectedTopics: state.topics
    }
}

export default connect(mapStateToProps, { })(Matching2);