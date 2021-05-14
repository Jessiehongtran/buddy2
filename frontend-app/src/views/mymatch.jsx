import axios from 'axios';
import React from 'react';
import { API_URL } from '../config';
import '../styles/mymatch.scss';
import Nav from '../components/nav';

export default class MyMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matches: [],
            timeZones: []
        }
    }

    async getTimeZones(){
        try {
            const res = await axios.get(`${API_URL}/api/timezones`)
            this.setState({timeZones: res.data})
        } catch(err){
           console.log(err.message)
        }
    }

    async getMatchesByRequestId(requestID){
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/matches/${requestID}`)
            if (res.data.length > 0){ 
                const match = res.data.filter(match => match.user_id !== userId)[0]
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;   
                let timeZoneDiff = 0 
                if (this.state.timeZones.length > 0){
                    for (let i = 0; i < this.state.timeZones.length; i++){
                        if (this.state.timeZones[i].value === tz){
                            timeZoneDiff = this.state.timeZones[i].dif
                        }
                    }
                }
                match.meetingTime = this.turnNumIntoTime(match.meetingTimeInt - timeZoneDiff*3600)
                this.setState({ matches: [...this.state.matches, match] })
            }
        } catch (err){
            console.error(err)
        }
    }

    async getRequestsByUserId(){
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/requests/user/${userId}`)
            if (res.data.length > 0){
                const requestsOfThisUser = res.data
                for (let i = 0; i < requestsOfThisUser.length ; i++){
                    this.getMatchesByRequestId(requestsOfThisUser[i].id)
                }
            }
        } catch (err){
            console.error(err)
        }
    }

    turnNumIntoTime(n){
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

    //when to call this function though, if call in return, I need the match, where the match can be stored? in database or in localStorage, maybe we need a match table to store matches, and dashboard for each user
    scheduleShowZoomLink(meetingTime, i){
        let now = new Date();
        let millisTillMeeting = new Date(meetingTime.year, meetingTime.month - 1, meetingTime.date, meetingTime.hour, meetingTime.minute, meetingTime.second,0 ) - now - 60*3600
        const { matches } = this.state;

        setTimeout(function(){
            matches[i].showZoomLink = true
            this.setState({ matches: matches })
        }.bind(this), millisTillMeeting);
    }

    componentDidMount(){
        this.getRequestsByUserId()
        this.getTimeZones()
    }

   

    render(){

        const { matches } = this.state;

        console.log('matches', matches)

        if (matches.length > 0){
            for (let i = 0; i < matches.length; i++){
                this.scheduleShowZoomLink(this.turnNumIntoTime(matches[i].meetingTimeInt), i)
            }
        }

        return (
            <>
            <Nav />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {this.state.matches.length > 0
                ? <table style={{ border: "1px solid silver", width: "80%", textAlign: "center", borderCollapse: "collapse", marginTop: "60px"}}>
                    <tr>
                        <th>Buddy Name</th>
                        <th>Meeting Time</th>
                        <th>Topics</th>
                        <th>Link</th>
                    </tr>
                    {this.state.matches.map(match => 
                        <tr>
                            <td>{match.first_name + " " + match.last_name}</td>
                            <td> 
                                {
                                (match.meetingTime.hour).toString().length > 1 
                                ?  match.meetingTime.hour 
                                : "0" + match.meetingTime.hour
                                }:{
                                match.meetingTime.minute.length > 1 
                                ? match.meetingTime.minute 
                                : "0" + match.meetingTime.minute
                                } {
                                " " + match.meetingTime.month 
                                + "/" + match.meetingTime.date 
                                + "/" + match.meetingTime.year 
                                }
                            </td>
                            <td>{match.topics}</td>
                            {
                                match.showZoomLink
                                ? <td><a href={"https://us02web.zoom.us/j/" + match.zoomID}>Join</a></td>
                                : <td></td>
                            }
                        </tr>
                    )}
                  </table>
                : <p>You have no match currently</p>}
            </div>
            </>
        )
    }
}