import React from 'react';
import '../styles/time3.scss';
import { addTimeSlot, postRequest} from '../actions';
import { connect } from 'react-redux';
import { API_URL } from '../config';
import Axios from 'axios';
import LogOut from '../components/logout';

class Time3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            request: {},
            divsToChangeColor: [],
            timeZones: [],
            selectedTimeZone: {},
            timeZoneDif: 0
        }

        this.updateTimeSlot = this.updateTimeSlot.bind(this)
        this.getTimeZones = this.getTimeZones.bind(this)
        this.updateTimeZone = this.updateTimeZone.bind(this)
    }

    componentDidMount(){
        this.getTimeZones()
    }

    async getTimeZones(){
        try {
            const res = await Axios.get(`${API_URL}/api/timezones`)
            console.log('timezones', res.data)
            this.setState({timeZones: res.data})
        } catch(err){
           console.log(err.message)
        }
    }

    turnIntToHourString(n){
        if (n < 0){
            return null
        } else if (n != 0 && n < 12 || n == 24){
            return n.toString() + ":00 AM"
        } 
        else if (n === 12){
            return n.toString() + ":00 PM"
        }
        else {
            return (n-12).toString() + ":00 PM"
        }
    }

    turnHourDayMonthIntoNum(hr, daymonth, year){
        const day = parseInt(daymonth.split("/")[0])
        const month = parseInt(daymonth.split("/")[1])

        return (year - 1970)*365*24 + month*30*24 + day*24 + hr
    }


    changeColor(div){
        if (div.style.backgroundColor === "rgb(255, 255, 255)"){
            div.style.backgroundColor = "#BFE0FF"
        } else {
            div.style.backgroundColor = "rgb(255, 255, 255)"
        }
        //make previous clicked back to white
        for (var i=0; i<this.state.divsToChangeColor.length; i++){
            this.state.divsToChangeColor[i].style.backgroundColor = "rgb(255, 255, 255)";
        }
    }

    calculateEpochSimilar(y, mon, d, h, min, s){
        return (y-1970)*365*24*3600 + mon*30*24*3600 + d*24*3600 + h*3600 + min*60 + s
      }

    turnNumToTime(n){
        const year = Math.floor(n/(365*24*3600)) + 1970
        n = n - (year-1970)*365*24*3600
        const mon = Math.floor(n/(30*24*3600)) 
        n = n - (mon)*30*24*3600
        const d = Math.floor(n/(24*3600))
        n = n - d*24*3600
        const h = Math.floor(n/(3600))
        n = n - h*3600
        const min = Math.floor(n/60)
        n = n - min*60
        return {
          year: year,
          month: mon, 
          date: d,
          hour: h,
          minute: min,
          second: n
        }
      }

    getLocalDateTime(){
        //get universal datetime as integer 
        const y = (new Date()).getUTCFullYear()
        const mon = (new Date()).getUTCMonth() + 1
        const d = (new Date()).getUTCDate()
        const h = (new Date()).getUTCHours()
        const min = (new Date()).getUTCMinutes()
        const s = (new Date()).getUTCSeconds()

        console.log('UTC time', 'year', y, 'month', mon, 'date', d, 'hour', h, 'minute', min, 'second', s)

        const timeAsNum = this.calculateEpochSimilar(y, mon, d, h, min, s)

        //get offset
        const timeOffset = this.state.timeZoneDif

        //add to get to local datetime as integer
        const localTimeNum = timeAsNum + timeOffset*3600

        //convert back to date and time local
        return this.turnNumToTime(localTimeNum)
    }

    updateTimeZone(e){
        this.setState({ timeZoneDif: parseInt(e.target.value) })
    }

    updateTimeSlot(timeInNum, div){
        const newRequest = {
            user_id: localStorage.getItem('userId'),
            timeSlotInteger: timeInNum,
            matched: false
        }
        this.setState({
            request: newRequest,
            divsToChangeColor: [
                ...this.state.divsToChangeColor,
                div
            ]
        })
        this.changeColor(div)
    }

    async submitTimeSlot(){
        if (this.state.request.timeSlotInteger){
            this.props.addTimeSlot(this.state.request.timeSlotInteger)
            this.props.postRequest(this.state.request)
            this.props.history.push('/topics')
        } else {
            alert("Please select a time slot")
        }
    }

    render(){

        const times = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]

        const days = {
                        0: ['Sun'],
                        1: ['Mon'],
                        2: ['Tue'],
                        3: ['Wed'],
                        4: ['Thu'],
                        5: ['Fri'],
                        6: ['Sat']
                     }
        const localTime = this.getLocalDateTime()
        console.log('timeZoneDiff', this.state.timeZoneDif)
        console.log('local Time', localTime)
        const localDay = parseInt(new Date(localTime.year, localTime.month -1, localTime.date, localTime.hour, localTime.minute, localTime.second).getDay())

        console.log('local Day', localDay)

        let dayInd = null
        let daysBefore = []
        let week = []
        for (let key in days){
            if (key != localDay && dayInd === null){
                daysBefore.push(days[key].concat([key]))
            }
            else if (key == localDay){
                week.push(days[key].concat([localTime.month.toString() + "/" + localTime.date.toString()]))
                dayInd = key
            } 
            else {
                if (dayInd){
                week.push(days[key].concat([localTime.month.toString() + "/" + (localTime.date + parseInt(key) - parseInt(dayInd)).toString()]))
                }
            }
        }

        for (let i = 0; i < daysBefore.length; i++){
            daysBefore[i][1] = localTime.month.toString() + "/" + (localTime.date + 7 + parseInt(daysBefore[i][1]) - parseInt(dayInd)).toString()
        }

        // console.log(daysBefore)

        week = week.concat(daysBefore)

        //the first date is already the current date, check if any hour already passed, don't show, else show
        const timesForCurDate = times.slice()
        for (let i = 0; i < timesForCurDate.length; i++){
            if (timesForCurDate[i] <= localTime.hour){
                timesForCurDate[i] = 0
            }
        }
        week[0] = week[0].concat(timesForCurDate)

        for (let i = 1; i < week.length; i++){
            week[i] = week[i].concat(times)
        }

        console.log('new week', week)


        return (
            <div className="timetable-container">
                <div className="logout-container">
                    <LogOut history={this.props.history}/>
                </div>
                <div className="timezone-container">
                    <label>Select your time zone</label>
                    <select className="timezone" name="timezone" onChange={this.updateTimeZone} >
                        <option>(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                        {this.state.timeZones.map(zone =>  <option value={zone.dif}>{zone.name}</option>)}
                    </select>
                </div>
                {week.length > 0
                ? <table>
                    {week.map((eachDay, i) => 
                    <tr>
                        {eachDay.map((el, elInd) => Number.isInteger(el) 
                            ? el == 0 
                                ? <td className="hour-invisible">0</td> 
                                : <td 
                                    className="hour-visible" 
                                    id = {i*16 + elInd}
                                    style={{backgroundColor: "#FFFFFF"}}
                                    onClick={() => this.updateTimeSlot(this.turnHourDayMonthIntoNum(el, week[i][1], localTime.year ), document.getElementById(`${i*16 + elInd}`))}>
                                        {this.turnIntToHourString(el)}
                                  </td> 
                            : <td className="daytime">{el}</td>)}
                    </tr>
                    )}
                 </table>
                : null}
                <button className="next-btn" onClick={() => this.submitTimeSlot()}>NEXT</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { addTimeSlot, postRequest})(Time3);