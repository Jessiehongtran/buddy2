import React from 'react';
import '../styles/time3.scss';

export default class Time3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    turnIntToHourString(n){
        if (n != 0 && n < 12 || n == 24){
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

    submitTimeSlot(timeInNum){
        console.log('timeInNum', timeInNum)
    }

    render(){

        const t = new Date()
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
        let curDay = parseInt(t.getUTCDay())
        let curDate = parseInt(t.getUTCDate())
        let curMonth = parseInt(t.getUTCMonth() + 1)
        let curYear = parseInt(t.getUTCFullYear())

        let dayInd = null
        let daysBefore = []
        let week = []
        for (let key in days){
            if (key != curDay && dayInd === null){
                daysBefore.push(days[key].concat([key]))
            }
            else if (key == curDay){
                week.push(days[key].concat([curMonth.toString() + "/" + curDate.toString()]))
                dayInd = key
            } 
            else {
                if (dayInd){
                week.push(days[key].concat([curMonth.toString() + "/" + (curDate + parseInt(key) - parseInt(dayInd)).toString()]))
                }
            }
        }

        for (let i = 0; i < daysBefore.length; i++){
            daysBefore[i][1] = curMonth.toString() + "/" + (curDate + 7 + parseInt(daysBefore[i][1]) - parseInt(dayInd)).toString()
        }

        // console.log(daysBefore)

        week = week.concat(daysBefore)

        //the first date is already the current date, check if any hour already passed, don't show, else show
        const timesForCurDate = times.slice()
        for (let i = 0; i < timesForCurDate.length; i++){
            console.log('t.getUTCHours()', t.getUTCHours(), 'curDate', curDate)
            if (timesForCurDate[i] < t.getUTCHours()){
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
                {week.length > 0
                ? <table>
                    {week.map((eachDay, i) => 
                    <tr>
                        {eachDay.map(el => Number.isInteger(el) ? el == 0 ? <td className="hour-invisible">0</td> : <td className="hour-visible" onClick={() => this.submitTimeSlot(this.turnHourDayMonthIntoNum(el, week[i][1], curYear ))}>{this.turnIntToHourString(el)}</td> : <td className="daytime">{el}</td>)}
                    </tr>
                    )}
                 </table>
                : null}
            </div>
        )
    }
}