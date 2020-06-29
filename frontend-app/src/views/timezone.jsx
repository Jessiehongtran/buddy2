import React, {Component} from 'react';
import '../styles/home.scss';
import { timeZones } from '../data/timeZones'

class TimeZone extends Component {
    constructor(props){
        super(props);
        
    }

    

    render(){
        return (
            <div class="timezone">
                <select name="timezone">
                    <option>Choose your timezone</option>
                    {timeZones.map(zone => <option value={zone.dif}>{zone.name}</option>)}
                </select>
            </div>
        )
    }
}

export default TimeZone;