import React from 'react';
import Axios from 'axios';
import { API_URL } from '../config';
import { connect } from 'react-redux';
import Nav from '../components/nav';

class Matching2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matchedZoomID: "",
            hasMatch: false,
            posted: false
        }
    }

    getAllRequests(){
        Axios.get(`${API_URL}/api/requests`)
             .then(res => {
                const requests = res.data
                if (requests.length > 0){
                    this.matching(requests)
                }
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
                    sharedTopicsInString += topicList1[i].topic_name
                } else {
                    sharedTopicsInString += ", " + topicList1[i].topic_name
                }
            }
        }
        return sharedTopicsInString
    }

    async updateMatch(request_id, change){
        try {
            const res = await Axios.patch(`${API_URL}/api/requests/${request_id}`, change)
        } catch (err){
            console.error(err)
        }
    }

    async postMatch(match){
        try {
            const res = await Axios.post(`${API_URL}/api/matches`, match)
        } catch (err){
            console.error(err)
        }
    }

    hasMatch(requests){
        const curRequest = this.props.currentRequest;
        curRequest.topics = this.props.selectedTopics;

        let i = 0
        while (i < requests.length){
            if (curRequest.timeSlotInteger === requests[i].timeSlotInteger 
                && requests[i].matched === 0 
                && curRequest.user_id !== requests[i].user.user_id //to make sure the request comes from a different user
                && this.hasSameTopics(curRequest.topics, requests[i].topics).length > 0){
                    return requests[i]
            }
            i++
        }

        return null
    }

    calculateEpochSimilar(y, mon, d, h, min, s){
        return (y-1970)*365*24*3600 + mon*30*24*3600 + d*24*3600 + h*3600 + min*60 + s
      }

    schedule(meetingTimeInt, requestID){
        let now = new Date();
        const nowTimeInt =  this.calculateEpochSimilar(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())
        const timeGap = meetingTimeInt - nowTimeInt - 15*60
        if (timeGap > 0){
            setTimeout(function(){
                //update showZoomLink
                this.updateMatch(requestID, { showZoomLink: true })
            }.bind(this), timeGap)
        }
    }

    matching(requests){
        const curRequest = this.props.currentRequest;
        const curRequestId = localStorage.getItem('request_id')
        const matched = this.hasMatch(requests)
        if (matched){
            this.setState({hasMatch: true})
            //update match boolean
            this.updateMatch(matched.id, { matched: true }) 
            this.updateMatch(curRequestId, { matched: true }) 
            //schedule to showZoomLink
            this.schedule(curRequest.timeSlotInteger, curRequestId)
            this.schedule(curRequest.timeSlotInteger, matched.id)
            //send to match table
            const matchToPost = {
                request1_id: curRequestId,
                request2_id: matched.id,
                meetingTimeInt: curRequest.timeSlotInteger,
                topics: this.hasSameTopics(curRequest.topics, matched.topics),
            }
            this.postMatch(matchToPost)

        }
    }


    render(){

        return (
            <>
            <Nav />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '80px'}}>
                {this.state.hasMatch
                ? <div style={{ textAlign: 'center', backgroundColor: '#C0F5C3', padding: '80px' }}>
                    <p style={{ fontSize: '26px', fontWeight: 'bold'}}>Congratz, you are atched with a buddy</p>
                    <a href="/mymatch" style={{ color: 'black'}}>Meet your buddy</a>
                  </div>
                : <div style={{ textAlign: 'center', backgroundColor: '#F7CFCC', padding: '80px' }}>
                    <p style={{ fontSize: '26px', color: 'red', fontWeight: 'bold' }}>
                        There is no buddy available for you :(
                    </p>
                    <a href="/times" style={{ color: 'black'}}>Find another timeslot</a>
                  </div>}
            </div>
            </>
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