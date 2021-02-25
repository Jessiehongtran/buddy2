import React, {Component} from 'react';
import axios from 'axios';
import { addTopic, postRequestTopic} from '../actions';
import { connect } from 'react-redux';
import LogOut from '../components/logout';
import Nav from '../components/nav';
import '../styles/topics.scss';

class Topics extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            selected_topics: [],
            hasMatch: false
        }   
    }
    
    handleClickTopic(topic, div){
        if (div.style.backgroundColor === "rgb(255, 255, 255)") {
            div.style.backgroundColor = "#F6D6C7";
            const selected = this.state.selected_topics
            selected.push(topic)
            this.setState({selected_topics: selected})
        } else{
            div.style.backgroundColor = "rgb(255, 255, 255)";
            const selected = this.state.selected_topics
            selected.pop(topic)
            this.setState({selected_topics: selected})
        }
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

    handleClickNext(){ 
        this.props.addTopic(this.state.selected_topics)
        //post request_topic
        const request_id = localStorage.getItem('request_id')
        console.log('handleClickNext', request_id, 'this.state.selected_topics', this.state.selected_topics)
        if (request_id){
            for (let i = 0; i < this.state.selected_topics.length; i++){
                console.log('about to post topic request', {
                    request_id: request_id,
                    topic_id:  this.state.selected_topics[i].id
                })
                this.props.postRequestTopic({
                    request_id: request_id,
                    topic_id:  this.state.selected_topics[i].id
                })
            }
            this.props.history.push('matching')
        }
    }

    componentDidMount(){
        axios.get('https://buddy-talk.herokuapp.com/api/topics')
             .then(res => {
                console.log('getting topics', res.data)
                this.setState({topics: res.data})
             })
             .catch(err => {
                 console.log(err.message)
             }) 
    }

    render(){

        if (this.state.topics.length > 0){
            return (
                <>
                <Nav />
                <div class="topics-container">
                    <div className="logout-container">
                        <LogOut history={this.props.history}/>
                    </div>
                    <p className="title">Which topics are you interested in to speak?</p>
                    <div className="topics">
                        {this.state.topics.map(topic => {
                            return (<div 
                                    class="topic" 
                                    id={topic.id} 
                                    style={{backgroundColor: "rgb(255,255,255)"}} 
                                    tabindex={topic.id} 
                                    onClick={
                                        () => this.handleClickTopic(topic, document.getElementById(topic.id))
                                    }>
                                        {topic.topic_name}
                                    </div>)
                        })}
                    </div>
                    <button onClick={() => this.handleClickNext()}>Next</button>
                </div>
                </>
            )
        } 
        else {
           return (
               <>
               <Nav />
               <div className="loader"></div>
               </>
           )
        }
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { addTopic, postRequestTopic })(Topics);