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

        this.changeTimeZone = this.changeTimeZone.bind(this)
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
                                    date: (this.state.localTime.getMonth() + 1).toString() + "/"+ (this.state.localTime.getDate() - this.state.localTime.getDay() + i).toString(), //find a way to update date into here for rendering
                                    times: newres.data //find a way to push time only after current time of that time zone
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

    changeTimeZone(){

    }

    render(){
        console.log('timeslots', this.state.timeslots)

        return (
            <div className="time-container">
                <div class="top">
                    <select className="timezone" name="timezone" onChange={this.changeTimeZone}>
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
                            {eachday.times.map(eachtime => 
                                <div className="time">{eachtime.timeslot} {eachtime.ampm}</div>)}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Time2;