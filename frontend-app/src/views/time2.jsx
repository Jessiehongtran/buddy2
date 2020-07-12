import React from 'react';
import '../styles/time.scss';
import {timeZones} from '../data/timeZones';
import Axios from 'axios';

class Time2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            days: [],
            originalTimeList: [],
            timeslots: [],
            localTime: new Date(),
        }

        this.updateTimeZone = this.updateTimeZone.bind(this)
    }

    componentDidMount(){
        Axios.get('https://buddy-talk.herokuapp.com/api/days')
             .then(res => {
                const days = res.data
                this.setState({days: days})
                Axios.get('https://buddy-talk.herokuapp.com/api/times')
                     .then(newres => {
                         this.setState({originalTimeList: newres.data})
                        
                     })
                     .catch(err => {
                        console.log(err.message)
                    })
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    checkTimeValid(timeArr){
            for (let i =0; i < timeArr.length; i++){
                let hour = parseInt(timeArr[i].timeslot.split(":")[0])
                if (timeArr[i].ampm == "PM" && timeArr[i].timeslot.split(":")[0] != 12){
                    hour = parseInt(timeArr[i].timeslot.split(":")[0]) + 12
                }

                console.log('hour', hour, parseInt(this.state.localTime.getHours()))
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

    updateTimeZone(e){
        this.updateLocalTime(parseInt(e.target.value))
        
    }

    updateLocalTime(dif){
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
        console.log('dif', dif)
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
        else if (h1 >24) {
          h1 = h1 - 24
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
        this.setState({localTime: new Date(year, month-1,day,h1,m1,s1 )})
        
        return new Date(year, month-1,day,h1,m1,s1 )
    }

    handleClick(){

    }

    render(){
        const timelist = this.state.originalTimeList.map(time => Object.assign({},time, {show: true}))
        const dateTimes = this.state.days.map(function(day, i){
            let timelistToAdd = timelist
            console.log(day.day_int, this.state.localTime.getDay())
            if (day.day_int == this.state.localTime.getDay()){
                timelistToAdd = this.checkTimeValid(this.state.originalTimeList)
            }
            return {
                day: day,
                date: (this.state.localTime.getMonth() + 1).toString() + "/"+ (this.state.localTime.getDate() - this.state.localTime.getDay() + day.day_int ).toString(),
                times: timelistToAdd
            }
        }, this)
        
        if (dateTimes.length > 0){
        return (
            <div className="time-container">
                <div class="top">
                    <select className="timezone" name="timezone" onChange={this.updateTimeZone} >
                        <option>Select your time zone</option>
                        {timeZones.map(zone =>  <option value={zone.dif}>{zone.name}</option>)}
                    </select>
                    <button onClick={() => this.props.history.push('/signup')}>Next</button>
                </div>
                <div className="slots">
                    <p>Choose your timeslot</p>
                    {dateTimes.map(function (eachday){ 
                        if (eachday.date.split("/")[1] >= this.state.localTime.getDate()){
                        return <div className="each-slot">
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
                        } 
                        }, this
                    )}
                </div>
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

export default Time2;