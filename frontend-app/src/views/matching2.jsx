import React from 'react';
import Axios from 'axios';
import { API_URL } from '../config';
import { connect } from 'react-redux';

class Matching2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            requests: []
        }
    }

    async getAllRequests(){
        Axios.get(`${API_URL}/api/requests`)
             .then(res => {
                 console.log(res.data)
                 this.setState({requests: res.data})
             })
             .catch(err => {
                console.log(err.message)
            })
    }

    componentDidMount(){
        this.getAllRequests()
    }

    hasMatch(){
        const curRequest = this.props.currentRequest;
        const { requests } = this.state;

        console.log('curRequest', curRequest, 'requests', requests)

        for (let i =0 ; i < requests.length ; i++){
            if (curRequest.timeSlotInteger === requests[i].timeSlotInteger && requests[i].matched === 0 && curRequest.user_id !== requests[i].id){
                return requests[i]
            }
        }

        return null
    }

    render(){
        console.log('props in matching2', this.props)
        console.log(this.hasMatch())

        return (
            <div>
                {this.hasMatch()
                ? <p>Matched with buddy #{this.hasMatch().id}</p>
                : <p>There is no buddy available for you :(</p>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentRequest: state.request
    }
}

export default connect(mapStateToProps, { })(Matching2);