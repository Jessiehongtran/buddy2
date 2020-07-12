import React, {Component} from 'react';
import '../styles/home.scss';
import axios from 'axios';
import {topics} from '../data/topics';
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
    
        this.setState({
            selected_topics: [...this.state.selected_topics, topic]})

        if (div.style.backgroundColor === "rgb(255, 255, 255)") {
            console.log("fired click")
            div.style.backgroundColor = "rgb(150, 219, 242)";
        } else{
            div.style.backgroundColor = "rgb(255, 255, 255)";
        }
    }

    handleClickNext(){
        localStorage.setItem('selected_topics', this.state.selected_topics)
        /*
        posted to backend these selected_topic
        */
        this.props.history.push('/time')
    }

    componentDidMount(){
        axios.get('https://buddy-talk.herokuapp.com/api/topics')
             .then(res => {
                this.setState({topics: res.data})
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    render(){
        console.log('checkk', this.state.selected_topics)

        
        return (
            <div class="topics">
                <p>Which topics are you interested in to speak?</p>
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
                <button onClick={() => this.handleClickNext()}>Next</button>
            </div>
        )
    }
}

export default Topics;