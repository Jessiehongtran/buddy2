import React from 'react';
import Axios from 'axios';
import { API_URL } from '../config';
import { connect } from 'react-redux';

class Matching2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            requests: []
        }
    }

    async getAllRequests(){
        Axios.get(`${API_URL}/api/requests`)
             .then(res => {
                 console.log(res.data)
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
        for (let i=0; i < topicList1.length; i++){
            if (this.appearIn(topicList1[i], topicList2) ){
                return true
            }
        }
        return false
    }

    hasMatch(){
        const curRequest = this.props.currentRequest;
        const { requests } = this.state;
        curRequest.topics = this.props.selectedTopics;

        console.log('curRequest', curRequest, 'requests', requests)

        for (let i =0 ; i < requests.length ; i++){
            if (curRequest.timeSlotInteger === requests[i].timeSlotInteger 
                && requests[i].matched === 0 
                && curRequest.user_id !== requests[i].id
                && this.hasSameTopics(curRequest.topics, requests[i].topics)){
                return requests[i]
            }
        }

        return null
    }


    render(){

        return (
            <div>
                {this.hasMatch()
                ? <p>Matched with buddy #{this.hasMatch().id}</p>
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