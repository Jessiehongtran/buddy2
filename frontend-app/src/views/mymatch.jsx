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
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/matches/${requestID}`)
            console.log('get matches by request id', res.data)
            if (res.data.length > 0){
                this.setState({ matches: [...this.state.matches, res.data.filter(match => match.user_id !== userId)[0]] })
            }
        } catch (err){
            console.error(err)
        }
    }

    async getRequestsByUserId(){
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/requests/user/${userId}`)
            console.log('get requests by user id', res.data)
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

    componentDidMount(){
        this.getRequestsByUserId()
    }

    render(){

        const { matches } = this.state;
        console.log(matches)

        return (
            <div>
                {this.state.matches.length > 0
                ? <div>
                    {this.state.matches.map(match => 
                        <div>
                            <p>Name: {match.first_name + " " + match.last_name}</p>
                            <p>Time</p>
                            <p>Topics: {match.topics}</p>
                            <p><a href={"https://us02web.zoom.us/j/" + match.zoomID}>Join</a></p>
                        </div>
                    )}
                  </div>
                : <p>You have no match currently</p>}
            </div>
        )
    }
}