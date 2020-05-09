import React, {Component} from 'react';
import '../styles/time.scss';
import {timeslots} from '../data/timeslots';

class Time extends Component {
    constructor(props){
        super(props);
        
    }

    

    render(){

        console.log(timeslots)

        // for (var day in timeslots){
        //     if (timeslots.hasOwnProperty(day)){
        //     console.log(day + " " + timeslots[day])
        //     return (
        //         <div class="time">
        //             <p>Choose your timeslot</p>
        //             <p>{day}</p>
        //             {timeslots[day].map(time => <p>{time}</p>) }
        //         </div>
        //     )
        //     }

        // }

        return (
            <div class="slots">
                <p>Choose your timeslot</p>
                {Object.keys(timeslots).map(function (day) {
            console.log(day + timeslots[day])
            return (
                        <div class="each-slot">
                            <p class="day">{day}</p>
                            {timeslots[day].map(time => <p class="time">{time}</p>) }
                        </div>
                    )
        })}
            </div>
        )

        

        
        

       
    }
}

export default Time;