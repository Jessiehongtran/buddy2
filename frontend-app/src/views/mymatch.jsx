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

    async getMatchesByUserId(){
        const userId = localStorage.getItem('userId')
        try {
            const res = await axios.get(`${API_URL}/api/matches/${userId}`)
            if (res.length > 0){
                this.setState({ matches: res.data })
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
                            <p><a>Join</a></p>
                        </div>
                    )}
                  </div>
                : <p>You have no match currently</p>}
            </div>
        )
    }
}