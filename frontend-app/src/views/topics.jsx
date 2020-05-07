import React, {Component} from 'react';
import '../styles/home.scss';
import {topics} from '../data/topics';
import '../styles/topics.scss';

class Topics extends Component {

    render(){
        return (
            <div class="topics">
                <p>Which topics are you interested in to speak?</p>
                {topics.map(topic => {
                    return (<div class="topic">{topic}</div>)
                })}
            </div>
        )
    }
}

export default Topics;