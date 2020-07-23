import React from 'react';
import '../styles/time.scss';
import Axios from 'axios';
import { API_URL } from '../config';
import { addDateTime, postRequest} from '../actions';
import { connect } from 'react-redux';

class Time2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            days: [],
            originalTimeList: [],
            timeslots: [],
            localTime: new Date(
                (new Date()).getUTCFullYear(),
                (new Date()).getUTCMonth(),
                (new Date()).getUTCDate(),
                (new Date()).getUTCHours(),
                (new Date()).getUTCMinutes(),
                (new Date()).getUTCSeconds(),
            ),
            timeZones: [],
            timeZoneSelected: {
                id: 30,
                dif: 0,
                name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",
                value: "Etc/Greenwich"
            },
            dateTimeClicked: {
                date: "",
                day: {},
                time: {}
            },
            divsToColor: []
        }

        this.updateTimeZone = this.updateTimeZone.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        Axios.get(`${API_URL}/api/timezones`)
             .then(res => {
                 this.setState({timeZones: res.data})
             })
             .catch(err => {
                console.log(err.message)
            })
        Axios.get(`${API_URL}/api/days`)
             .then(res => {
                const days = res.data
                this.setState({days: days})
                Axios.get(`${API_URL}/api/times`)
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
        const id = e.target.value
        let zone = {}
        for (let i =0; i < this.state.timeZones.length; i++){
            if (this.state.timeZones[i].id == id){
                zone = this.state.timeZones[i]
            }
        }
        if (zone){
            this.setState({timeZoneSelected: zone})
            this.updateLocalTime(parseInt(zone.dif))
        }
        
    }

    updateLocalTime(dif){
        const utc = new Date()
        let year = utc.getUTCFullYear()
        let month = utc.getUTCMonth()
        let day = utc.getUTCDate()
        let hour = utc.getUTCHours()
        let min = utc.getUTCMinutes()
        let sec = utc.getUTCSeconds()
        
        //convert hour based on time zone difference
        console.log('hour', hour)
        console.log('dif', dif)
        hour = hour + dif
        console.log('hour after', hour)
      
        if (hour < 0){
          hour = 24 + hour
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
        else if (hour >24) {
          hour = hour - 24
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
        this.setState({localTime: new Date(year, month,day,hour,min,sec )})

        console.log(year, month,day,hour,min,sec)
        
        return new Date(year, month,day,hour,min,sec)
    }

    handleClick(date, day, time, div){
        const dateTimeClicked = {
            date: date,
            day: day,
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
    
    handleSubmit(){
        const request = {
            day_id: this.state.dateTimeClicked.day.id,
            time_id: this.state.dateTimeClicked.time.id,
            date: this.state.dateTimeClicked.date,
            timezone_id: this.state.timeZoneSelected.id,
            matched: false
        }
        const userId = this.props.state.request.user_id
        if (userId > 0){
            request.user_id = parseInt(userId)
            console.log('request', request)
            this.props.postRequest(request)
            this.props.history.push('/topics')
        }
        else {
            this.props.addDateTime(request)
            this.props.history.push('/signup')
        }
    
    }

    render(){
        console.log('props in time2', this.props)

        //make sure today is displayed first and the other days in the coming week follow
        let sortedDays = []
        for (let i=0; i<this.state.days.length; i++){
            let x 
            if (i + this.state.localTime.getDay() < this.state.days.length){
                x = i+ this.state.localTime.getDay()
            }
            else {
                x = i+ this.state.localTime.getDay() - this.state.days.length
            }
            sortedDays.push(this.state.days[x])
        }

        const timelist = this.state.originalTimeList.map(time => Object.assign({},time, {show: true}))
        const dateTimes = sortedDays.map(function(day, i){
            let timelistToAdd = timelist
            if (day.day_int == this.state.localTime.getDay()){
                timelistToAdd = this.checkTimeValid(this.state.originalTimeList)
            }
            return {
                day: day,
                date: (this.state.localTime.getMonth() + 1).toString() + "/"+ (this.state.localTime.getDate() + i ).toString(),
                times: timelistToAdd
            }
        }, this)

        if (dateTimes.length > 0){
        return (
            <div className="time-container">
                <div class="top">
                    <label>Select your time zone</label>
                    <select className="timezone" name="timezone" onChange={this.updateTimeZone} >
                        <option>(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                        {this.state.timeZones.map(zone =>  <option value={zone.id}>{zone.name}</option>)}
                    </select>
                    <button onClick={() => this.handleSubmit()}>Next</button>
                </div>
                <div className="slots">
                    <p>Choose your timeslot</p>
                    {dateTimes.map(function (eachday, dayInd){ 
                        if (eachday.date.split("/")[1] >= this.state.localTime.getDate()){
                        return <div className="each-slot">
                            <p className="day">{eachday.day.day_name}</p>
                            <p className="date">{eachday.date}</p>
                            {eachday.times.map(function(eachtime, timeInd){ 
                                if (!eachtime.show)
                                    {return <div className="time-not" >{eachtime.timeslot} {eachtime.ampm}</div>}
                                else {
                                    return <div 
                                    className="time"
                                    style={{backgroundColor: "rgb(255,255,255)"}}
                                    id = {dayInd*16 + timeInd} 
                                    onClick={() => this.handleClick(eachday.date, eachday.day, eachtime, document.getElementById(dayInd*16 + timeInd))}
                                    >{eachtime.timeslot} {eachtime.ampm}</div>
                                    }
                                }, this
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

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { addDateTime, postRequest})(Time2);