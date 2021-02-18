import axios from 'axios';
import React from 'react';
import { API_URL } from '../config';


export default class MyMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matches: []
        }
    }

    async getMatchesByRequestId(requestID){
        let matches = []
        try {
            const res = await axios.get(`${API_URL}/api/matches/${requestID}`)
            console.log('get matches by request id', res.data)
            if (res.data.length > 0){
                matches = res.data
            }
        } catch (err){
            console.error(err)
        }

        return matches
    }

    async getMatchesByUserId(){
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/requests/user/${userId}`)
            console.log('get requests by user id', res.data)
            if (res.data.length > 0){
                const requestsOfThisUser = res.data
                const { matches } = this.state;
                for (let i = 0; i < requestsOfThisUser.length ; i++){
                    if (this.getMatchesByRequestId(requestsOfThisUser[i].id).length > 0){
                        matches.concat(this.getMatchesByRequestId(requestsOfThisUser[i].id))
                    }
                }
                this.setState({ matches: matches })
            }
        } catch (err){
            console.error(err)
        }
    }

    componentDidMount(){
        this.getMatchesByUserId()
    }

    render(){

        const { matches } = this.state;

        return (
            <div>
                {matches.length > 0
                ? <div>
                    {matches.map(match => 
                        <div>
                            <p>Name</p>
                            <p>Time</p>
                            <p>Topics</p>
                            <p><a>Join</a></p>
                        </div>
                    )}
                  </div>
                : <p>You have no match currently</p>}
            </div>
        )
    }
}