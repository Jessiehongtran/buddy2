import React, {Component} from 'react';
import axios from 'axios';
import { addTopic, postRequestTopic} from '../actions';
import { connect } from 'react-redux';
import '../styles/topics.scss';

class Topics extends Component {
    constructor(props){
        super(props);
        this.state = {
            topics: [],
            selected_topics: []
        }   
    }

    
    handleClickTopic(topic, div){
        if (div.style.backgroundColor === "rgb(255, 255, 255)") {
            console.log("fired click")
            div.style.backgroundColor = "#F6D6C7";
            const selected = this.state.selected_topics
            selected.push(topic)
            this.setState({selected_topics: selected})
        } else{
            console.log("unclicked")
            div.style.backgroundColor = "rgb(255, 255, 255)";
            const selected = this.state.selected_topics
            selected.pop(topic)
            this.setState({selected_topics: selected})
        }
    }

    handleClickNext(){ 
        this.props.addTopic(this.state.selected_topics)
    }

    componentDidMount(){
        axios.get('https://buddy-talk.herokuapp.com/api/topics')
             .then(res => {
                this.setState({topics: res.data})
                console.log('get topics', res.data)
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    render(){
        console.log('state', this.props.state)
        if (this.props.state.topics.length > 0){
            for (let i=0; i< this.props.state.topics.length; i++){
                const request_topic_ids = {
                    request_id: this.props.state.request_id,
                    topic_id: this.props.state.topics[i].id
                }
                this.props.postRequestTopic(request_topic_ids)
            }
            this.props.history.push('/matching')
        }

        if (this.state.topics.length > 0){
            return (
                <div class="topics-container">
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
            )
        }
        else {
           return (
               <div className="loader"></div>
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