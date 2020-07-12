import React from 'react';
import '../styles/time.scss';
import {timeZones} from '../data/timeZones';
import Axios from 'axios';

class Time2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            timeslots: [],
            localTime: new Date()
        }

        this.updateLocalTime = this.updateLocalTime.bind(this)
    }

    componentDidMount(){
        Axios.get('https://buddy-talk.herokuapp.com/api/days')
             .then(res => {
                const days = res.data
                Axios.get('https://buddy-talk.herokuapp.com/api/times')
                     .then(newres => {
                         this.updateTimeSlots(days, newres.data)
                     })
                     .catch(err => {
                        console.log(err.message)
                    })
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    updateTimeSlots(days, originalTimeList){
        const timelist = originalTimeList.map(time => Object.assign({},time, {show: true}))
        const dateTimes = days.map(function(day, i){
            let timelistToAdd = timelist
            if (day.day_int == this.state.localTime.getDay()){
                timelistToAdd = this.checkTimeValid(originalTimeList)
            }
            return {
                day: days[i],
                date: (this.state.localTime.getMonth() + 1).toString() + "/"+ (this.state.localTime.getDate() - this.state.localTime.getDay() + day.day_int ).toString(),
                times: timelistToAdd
            }
        }, this)
        this.setState({timeslots: dateTimes})
    }

    checkTimeValid(timeArr){
            for (let i =0; i < timeArr.length; i++){
                let hour = parseInt(timeArr[i].timeslot.split(":")[0])
                if (timeArr[i].ampm == "PM" && timeArr[i].timeslot.split(":")[0] != 12){
                    hour = parseInt(timeArr[i].timeslot.split(":")[0]) + 12
                }
                if (hour <= parseInt(this.state.localTime.getHours())){
                    timeArr[i].show = false
                }
                else {
                    console.log('true')
                    timeArr[i].show = true
                }
            }
            
        return timeArr

    }

    updateLocalTime(){

    }

    handleClick(){

    }

    render(){
        console.log('timeslots', this.state.timeslots)

        return (
            <div className="time-container">
                <div class="top">
                    <select className="timezone" name="timezone" onChange={this.updateLocalTime}>
                        <option>Select your time zone</option>
                        {timeZones.map(zone =>  <option value={zone.dif}>{zone.name}</option>)}
                    </select>
                    <button onClick={() => this.props.history.push('/signup')}>Next</button>
                </div>
                <div className="slots">
                    <p>Choose your timeslot</p>
                    {this.state.timeslots.map(eachday => 
                        <div className="each-slot">
                            <p className="day">{eachday.day.day_name}</p>
                            <p className="date">{eachday.date}</p>
                            {eachday.times.map(function(eachtime){ 
                                if (!eachtime.show)
                                    {return <div className="time-not">{eachtime.timeslot} {eachtime.ampm}</div>}
                                else {
                                    return <div className="time">{eachtime.timeslot} {eachtime.ampm}</div>
                                    }
                                }
                                )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Time2;