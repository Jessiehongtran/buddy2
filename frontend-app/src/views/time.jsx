import React, {Component} from 'react';
import '../styles/time.scss';
import {timeslots} from '../data/timeslots';
import {timeZones} from '../data/timeZones';
import Axios from 'axios';

class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            timeslots: [],
            timezoneDif: 0,
            currentTime: {
                year: (new Date()).getFullYear(),
                month: (new Date()).getMonth()+1,
                date: (new Date()).getDate(),
                hour: (new Date()).getHours(),
                min: (new Date()).getMinutes(),
                sec: (new Date()).getSeconds(),
                daynight: 'AM'
            },
            dateTimeClicked: {
                date: '',
                time: ''
            },
            divsToColor: []

        }

        this.handleChange = this.handleChange.bind(this)
        // this.updateCurrentTime = this.updateCurrentTime(this)
        
    }

    componentDidMount(){
        Axios.get('https://buddy-talk.herokuapp.com/api/days')
             .then(res => {
                const days = res.data
                Axios.get('https://buddy-talk.herokuapp.com/api/times')
                     .then(newres => {
                        const timeslots = []
                        for (let i=0; i<days.length;i++){
                            const timeObj = {
                                day: days[i],
                                date: "",
                                times: newres.data
                            }
                            timeslots.push(timeObj)
                        }
                        console.log('timeslots from get request', timeslots)
                        this.setState({timeslots: timeslots})

                     })
                     .catch(err => {
                        console.log(err.message)
                    })
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    updateCurrentTime(){
        this.setState({currentTime: this.getLocalTime(this.state.timezoneDif)})
    }

    //update time zone
    handleChange(e) {
        this.setState({timezoneDif: parseInt(e.target.value)})
        this.updateCurrentTime()
    }

    //compare current time to show only the time after that
    toShowTime(timeslot){
        // console.log('currentTime in toShowTime', this.state.currentTime)
        var currH = this.state.currentTime.hour
        const ampmC = this.state.currentTime.daynight
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
    getAnotherdate(now, offset){
        // var month = parseInt(monthdate.split('/')[0])
        // var date = parseInt(monthdate.split('/')[1])
        var month = this.state.currentTime.month
        var date = this.state.currentTime.date
      
        if (offset > now){
          if (date - now + offset <= new Date(2020, month, 0).getDate()){
            return month.toString() + "/" + (date - now + offset).toString()
          }
          else {
            return (month+1).toString() + "/" + (date - now + offset - new Date(2020, month, 0).getDate()).toString()
          
        }
      
      }
    }

    getLocalTime(dif){
        let datetime = (new Date()).toLocaleString()
        let date = datetime.split(', ')[0]
        let day = parseInt(date.split('/')[1])
        let month = parseInt(date.split('/')[0])
        let year = parseInt(date.split('/')[2])
        let time = datetime.split(', ')[1]
        let daynight = time.split(' ')[1]
        let currentTime = time.split(' ')[0]
      
        let hour = parseInt(currentTime.split(':')[0])
        let min = parseInt(currentTime.split(':')[1])
        let sec = parseInt(currentTime.split(':')[2])
        
        //convert hours based on morning/afternoon
        if (daynight == 'PM' && hour !== 12){
          hour = hour + 12
        }
      
        //convert hour based on time zone difference
        let t = (hour+ dif)*3600 + min*60 + sec
        let h1 = Math.floor(t/3600)
        let m1 = Math.floor((t-h1*3600)/60)
        let s1 = t - h1*3600 - m1*60
      
        if (h1 < 0){
          h1 = 24 + h1
          day = day - 1
          if (day < 0){
            day = new Date(2020, month-1, 0).getDate()
            month = month - 1
            if (month <0){
              year = year - 1
              month = 12
            }
          }
        }
        else {
          hour = h1 - 24
          day = day + 1
          if (day > new Date(2020, month, 0).getDate()){
            day = 1
            month = month + 1
            if (month > 12){
              year = year + 1
              month = 1
            }
          }
        }
      
        //convert back to AM or PM
        if (h1 < 12){
          daynight = 'AM'
        }
        else {
          daynight = 'PM'
          h1 = h1 - 12
        }
      
        //check digits of min
        if (m1.toString().length === 1){
          m1 = '0' + m1.toString() 
        }
      
        //check digits of sec
        if (s1.toString().length === 1){
          s1 = '0' + s1.toString() 
        }
      
        return {
          year: year,
          month: month,
          date: day,
          hour: h1,
          min: m1,
          sec: s1,
          daynight: daynight
        }
      }
    
    

    render(){
        console.log('this.state.currentTime', this.state.currentTime)
        console.log(this.state.dateTimeClicked)

        const arrangedSlots = []
        var todate = (this.state.currentTime.month).toString() + "/" + this.state.currentTime.date.toString()

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

        console.log('arrangedSlots', arrangedSlots)

        return (
            <div class="time-container">
                {/* {this.toShowTime(this.state.currentTime, "9:00 AM")? <h1>OK</h1>: <h1>Not ok</h1>} */}
                <div class="top">
                    <select className="timezone" name="timezone" onChange={this.handleChange}>
                        <option>Select your time zone</option>
                        {timeZones.map(zone =>  <option value={zone.dif}>{zone.name}</option>)}
                    </select>
                    <button onClick={() => this.props.history.push('/signup')}>Next</button>
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