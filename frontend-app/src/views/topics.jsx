import React, {Component} from 'react';
import '../styles/home.scss';
import {topics} from '../data/topics';
import '../styles/topics.scss';

class Topics extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected_topics: []
        }   
    }

    
    handleClickTopic(topic){
    
        this.setState({
            selected_topics: [...this.state.selected_topics, topic]})
    }

    handleClickNext(){
        localStorage.setItem('selected_topics', this.state.selected_topics)
        /*
        posted to backend these selected_topic
        */
        this.props.history.push('/time')
    }

    render(){
        console.log('checkk', this.state.selected_topics)

        return (
            <div class="topics">
                <p>Which topics are you interested in to speak?</p>
                {topics.map(topic => {
                    return (<div class="topic" onClick={() => this.handleClickTopic(topic)}>{topic}</div>)
                })}
                <button onClick={() => this.handleClickNext()}>Next</button>
            </div>
        )
    }
}

export default Topics;