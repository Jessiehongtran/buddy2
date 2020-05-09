import React, {Component} from 'react';
import '../styles/time.scss';
import {timeslots} from '../data/timeslots';

class Time extends Component {
    constructor(props){
        super(props);
        
    }

    

    render(){

        for (var day in timeslots){
            return (
                <div class="time">
                    <p>Choose your timeslot</p>
                    <p>{day}</p>
                    {timeslots[day].map(time => <p>{time}</p>) }
                </div>
            )

        }

       
    }
}

export default Time;