import React from 'react';
import '../styles/time3.scss';
import { addTimeSlot, postRequest} from '../actions';
import { connect } from 'react-redux';
import { API_URL } from '../config';
import Axios from 'axios';
import Nav from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle} from '@fortawesome/free-solid-svg-icons'

class Time3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            request: {},
            divsToChangeColor: [],
            timeZones: [],
            selectedTimeZone: {},
            timeZoneDif: 0,
            requestsByThisUser: [],
            error: ""
        }

        this.updateTimeSlot = this.updateTimeSlot.bind(this)
        this.getTimeZones = this.getTimeZones.bind(this)
        this.updateTimeZone = this.updateTimeZone.bind(this)
    }

    componentDidMount(){
        this.getTimeZones()
        this.getRequestsByUser()
    }

    async getRequestsByUser(){
        const userId = localStorage.getItem('userId')
        try {
            const res = await Axios.get(`${API_URL}/api/requests/user/${userId}`)
            if (res.data.length > 0){
                this.setState({ requestsByThisUser: res.data })
            }
        } catch (err){
            console.error(err.message)
        }
    }

    async getTimeZones(){
        try {
            const res = await Axios.get(`${API_URL}/api/timezones`)
            this.setState({timeZones: res.data})
        } catch(err){
           console.log(err.message)
        }
    }

    isUniqueTimeSlot(timeInt){
        const { requestsByThisUser } = this.state
        if (requestsByThisUser.length > 0){
            for ( let i =0; i < requestsByThisUser.length; i++ ){
                console.log('timeInt', timeInt, 'requestsByThisUser[i].timeSlotInteger', requestsByThisUser[i].timeSlotInteger)
                if (requestsByThisUser[i].timeSlotInteger === timeInt){
                    return false
                }
            }
        }
        return true
    }

    turnIntToHourString(n){
        if (n < 0){
            return null
        } else if ((n !== 0 && n < 12) || n === 24){
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
        //make previous clicked back to white
        const curColorDivs = this.state.divsToChangeColor
        for (var i=0; i<curColorDivs.length; i++){
            curColorDivs[i].style.backgroundColor = "rgb(255, 255, 255)";
        }
        this.setState({ divsToChangeColor: curColorDivs })
        //change bg color of that particular div
        if (div.style.backgroundColor === "rgb(255, 255, 255)"){
            div.style.backgroundColor = "#BFE0FF"
        } else {
            div.style.backgroundColor = "rgb(255, 255, 255)"
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
            matched: false,
            showZoomLink: false
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
        const UTCTimeNum = this.state.request.timeSlotInteger + this.state.timeZoneDif*3600
        if (this.state.request.timeSlotInteger && UTCTimeNum){
            this.props.addTimeSlot(UTCTimeNum)
            //check if the user has chosen this timeslot before
            if (this.isUniqueTimeSlot(this.state.request.timeSlotInteger)){
                this.props.postRequest(this.state.request)
                this.props.history.push('/topics')
            } else {
                this.setState({ error: "You had a meeting at this time, please choose a different time slot"})
            }
        } else {
            this.setState({ error: "Please select a time slot"})
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
        const localDay = parseInt(new Date(localTime.year, localTime.month -1, localTime.date, localTime.hour, localTime.minute, localTime.second).getDay())

        let dayInd = null
        let daysBefore = []
        let week = []
        for (let key in days){
            if (key !== localDay && dayInd === null){
                daysBefore.push(days[key].concat([key]))
            }
            else if (key === localDay){
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

        return (
            <>
            <Nav /> 
            <div className="timetable-container">
                <div className="timezone-container">
                    <label>Select your time zone</label>
                    <select className="timezone" name="timezone" onChange={this.updateTimeZone} >
                        <option>(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</option>
                        {this.state.timeZones.map(zone =>  <option value={zone.dif}>{zone.name}</option>)}
                    </select>
                    <button className="next-btn" onClick={() => this.submitTimeSlot()}>NEXT</button>
                </div>
                {this.state.error.length > 0
                ? <p style={{ color: "red", fontStyle: "italic", backgroundColor: "#F7CFCC", padding: "8px 20px", borderRadius: "4px", marginTop: "0", marginBottom: "20px" }}>
                    <FontAwesomeIcon
                            icon={faInfoCircle} 
                            className="info-icon"
                            style={{ color: "red", marginRight: "10px"}}
                        /> 
                    {this.state.error}
                  </p>
                : null}
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
                                    onClick={() => this.updateTimeSlot(this.calculateEpochSimilar(localTime.year, localTime.month, parseInt(week[i][1].split('/')[1]), el, 0, 0 ), document.getElementById(`${i*16 + elInd}`))}>
                                        {this.turnIntToHourString(el)}
                                  </td> 
                            : <td className="daytime">{el}</td>)}
                    </tr>
                    )}
                 </table>
                : null}

            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, { addTimeSlot, postRequest})(Time3);