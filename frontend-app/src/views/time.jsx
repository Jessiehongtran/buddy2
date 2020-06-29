import React, {Component} from 'react';
import '../styles/time.scss';
import {timeslots} from '../data/timeslots';
import {timeZones} from '../data/timeZones';

class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            timezone: "America/Los_Angeles",
            currentTime: (new Date()).toLocaleString('en-US', { timezone: "America/Los_Angeles" }).split(",")[1],
            currentDate: (new Date()).getDate(),
            currentMonth: (new Date()).getMonth(),
            dateTimeClicked: {
                date: '',
                time: ''
            },
            divsToColor: []

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
        // console.log('currentTime in toShowTime', this.state.currentTime)
        var currH = this.state.currentTime.split(":")[0]
        const ampmC = this.state.currentTime.split(" ")[2]
        // console.log(ampmC)
        var timeH = timeslot.split(":")[0]
        const ampmT = timeslot.split(" ")[1]

        if (ampmC === "PM" && parseInt(currH) !== 12){
            currH = parseInt(currH) + 12
        }

        if (ampmT === "PM" && parseInt(timeH) !== 12){
            timeH = parseInt(timeH) + 12
        }

        // console.log(currH, timeH)

        if (parseInt(currH) >= parseInt(timeH)){
            return false
        }
        
        return true
        
    }

    //when the slot is clicked
    handleClickTime(date, time, div){
        const dateTimeClicked = {
            date: date,
            time: time
        }
        this.setState({
            dateTimeClicked: dateTimeClicked,
            divsToColor: [...this.state.divsToColor, div]
        })

        if (div.style.backgroundColor === "rgb(255, 255, 255)") {
            console.log("fired click")
            div.style.backgroundColor = "rgb(150, 219, 242)";
        } else{
            div.style.backgroundColor = "rgb(255, 255, 255)";
        }

        //make previous clicked back to white
        for (var i=0; i<this.state.divsToColor.length; i++){
            this.state.divsToColor[i].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }

    //to get another date based on one date
    getAnotherdate(monthdate, now, offset){
        var month = parseInt(monthdate.split('/')[0])
        var date = parseInt(monthdate.split('/')[1])
      
        if (offset > now){
          if (date - now + offset <= new Date(2020, month, 0).getDate()){
            return month.toString() + "/" + (date - now + offset).toString()
          }
          else {
            return (month+1).toString() + "/" + (date - now + offset - new Date(2020, month, 0).getDate()).toString()
          
        }
      
      }
    }
    
    

    render(){
        console.log(this.state.dateTimeClicked)

        const arrangedSlots = []
        var todate = (this.state.currentMonth+1).toString() + "/" + this.state.currentDate.toString()

        for (var i=0; i < timeslots.length; i++){
            if (i == (new Date()).getDay()){
                arrangedSlots.push(timeslots[i])
                var j = i + 1
                while (j < timeslots.length){
                    var dateObj = {
                        day: timeslots[j].day,
                        date: this.getAnotherdate(todate, i, j),
                        times: timeslots[j].times
                    }
                    arrangedSlots.push(dateObj)
                    j += 1
                }
                if (j === timeslots.length){
                    while (j - timeslots.length< i){
                        var dateObj2 = {
                            day: timeslots[j-timeslots.length].day,
                            date: this.getAnotherdate(todate, i, j),
                            times: timeslots[j-timeslots.length].times
                        }
                        arrangedSlots.push(dateObj2)
                        j += 1
                    }
                }
            }
        }

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
                    {arrangedSlots.map(function (slot, i) {
                        if (i === 0){
                        return (
                                    <div class="each-slot">
                                        <p class="day">{slot.day}</p>
                                        <p>{todate}</p>
                                        {slot.times.map(function (time, ind){  
                                            if (this.toShowTime(time)){
                                                // console.log('1', i+ind)
                                                return <p class="time" style={{backgroundColor: "rgb(255,255,255)"}} id = {i + ind} onClick={() => this.handleClickTime(todate, time, document.getElementById(i*8 + ind))}>{time}</p>
                                            } else {
                                            return <p class="time-not">{time}</p>
                                            }
                                        }, this
                                        )}
                                    </div>
                                )
                        }

                        else {
                            return (
                                <div class="each-slot">
                                        <p class="day">{slot.day}</p>
                                        <p class="non-date">{slot.date}</p> 
                                        {slot.times.map(function(time,ind2){
                                            // console.log('i', i, 'ind2', ind2)
                                            // console.log('2', i*16 + ind2)
                                            return <p class="time" style={{backgroundColor: "rgb(255,255,255)"}} id = {i*16 + ind2} onClick={() => this.handleClickTime(slot.date, time, document.getElementById(i*16 + ind2))}>{time}</p>
                                        }, this
                                        )}
                                    </div>
                            )
                        }
                            }, this)}
                            
                </div>
            </div>
        )
       
    }
}

export default Time;