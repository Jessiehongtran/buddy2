import React, {Component} from 'react';
import '../styles/time.scss';
import {timeslots} from '../data/timeslots';
import {timeZones} from '../data/timeZones';

class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            timezone: "America/Los_Angeles",
            currentTime: "6:00:00 AM"

        }

        this.handleChange = this.handleChange.bind(this)
        // this.updateCurrentTime = this.updateCurrentTime(this)
        
    }

    updateCurrentTime(){
        const d = (new Date()).toLocaleString('en-US', { timezone: this.state.timezone })
        this.setState({currentTime: d.split(",")[1]})
    }

    //update time zone
    handleChange(e) {
        console.log(e.target.value)
        this.setState({timezone: e.target.value})
        this.updateCurrentTime()
    }

    //compare current time to show only the time after that
    toShowTime(timeslot){
        console.log('currentTime in toShowTime', this.state.currentTime)
        var currH = this.state.currentTime.split(":")[0]
        const ampmC = this.state.currentTime.split(" ")[2]
        console.log(ampmC)
        var timeH = timeslot.split(":")[0]
        const ampmT = timeslot.split(" ")[1]

        if (ampmC === "PM"){
            currH = parseInt(currH) + 12
        }

        if (ampmT === "PM"){
            timeH = parseInt(timeH) + 12
        }

        console.log(currH, timeH)

        if (currH >= timeH){
            return false
        }
        else {
            return true
        }
    }
    
    //show date with Mon, Tue

    render(){

        console.log(timeslots)
        console.log('currenttime', this.state.currentTime)
        console.log(this.toShowTime(this.state.currentTime, "9:00 AM"))

        return (
            <div class="time-container">
                {/* {this.toShowTime(this.state.currentTime, "9:00 AM")? <h1>OK</h1>: <h1>Not ok</h1>} */}
                <div>
                    <select name="timezone" onChange={this.handleChange}>
                        <option>Select one</option>
                        {timeZones.map(zone =>  <option value={zone.value}>{zone.name}</option>)}
                    </select>
                </div>
                <div class="slots">
                    <p>Choose your timeslot</p>
                    {Object.keys(timeslots).map(function (day) {
                console.log(day + timeslots[day])
                return (
                            <div class="each-slot">
                                <p class="day">{day}</p>
                                {timeslots[day].map(function (time){  
                                    if (this.toShowTime(time)){
                                        return <p class="time">{time}</p>
                                    } else {
                                        return <p class="time"></p>
                                    }
                                }, this
                                )}
                            </div>
                        )
                    }, this)}
                </div>
            </div>
        )
       
    }
}

export default Time;