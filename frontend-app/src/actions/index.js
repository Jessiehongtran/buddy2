import axios from 'axios'
import { API_URL } from '../config'
export const ADD_USER_ID = 'ADD_USER_ID'
export const ADD_TOPIC = 'ADD_TOPIC'
export const ADD_DATE_TIME = 'ADD_DATE_TIME'
export const POST_USER_FAILURE = 'POST_USER_FAILURE'
export const UPDATE_REQUEST_ID = 'UPDATE_REQUEST_ID'
export const POST_REQUEST_FAILURE = 'UPDATE_REQUEST_FAILURE'
export const POST_REQUEST_TOPIC_SUCCESS = 'POST_REQUEST_TOPIC_SUCCESS'
export const POST_REQUEST_TOPIC_FAILURE = 'POST_REQUEST_TOPIC_FAILURE'

export const addDateTime = dateTime => {
    return {
        type: ADD_DATE_TIME,
        payload: dateTime
    }
}

export const addTopic = topics => {
    return {
        type: ADD_TOPIC,
        payload: topics
    }
}

export const postUser = user => {
    return dispatch => {
        axios
            .post(`${API_URL}/api/users`, user)
            .then(res => {
                console.log('posted user successfully')
                dispatch({
                    type: ADD_USER_ID,
                    payload: res.data.id
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_USER_FAILURE,
                    payload: err.message
                })
            })
    }
}

export const postRequest = request => {
    return dispatch => {
        axios
            .post(`${API_URL}/api/requests`, request)
            .then(res => {
                console.log('posted request successfully')
                dispatch({
                    type: UPDATE_REQUEST_ID,
                    payload: res.data.id
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_REQUEST_FAILURE,
                    payload: err.message
                })
            })
    }
}

// export const postRequest =(request) => async dispatch => {
//     const id  = await axios.post(`${API_URL}/api/requests`, request);
//     dispatch({
//           type: UPDATE_REQUEST_ID,
//           payload: id
//         })
// }

export const postRequestTopic = request_topic_ids => {
    return dispatch => {
        axios
            .post(`${API_URL}/api/topics/withRequest`, request_topic_ids)
            .then(res => {
                console.log('posted request topic successfully')
                dispatch({
                    type: POST_REQUEST_TOPIC_SUCCESS,
                    payload: res.data.id
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_REQUEST_TOPIC_FAILURE,
                    payload: err.message
                })
            })
    }
}




