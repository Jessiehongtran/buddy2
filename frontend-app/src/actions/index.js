import axios from 'axios'
import { API_URL } from '../config'
export const ADD_USER_ID = 'ADD_USER_ID'
export const ADD_TOPIC = 'ADD_TOPIC'
export const ADD_TIMESLOT = 'ADD_TIMESLOT'
export const POST_USER_FAILURE = 'POST_USER_FAILURE'
export const UPDATE_REQUEST_ID = 'UPDATE_REQUEST_ID'
export const POST_REQUEST_FAILURE = 'UPDATE_REQUEST_FAILURE'
export const POST_REQUEST_TOPIC_SUCCESS = 'POST_REQUEST_TOPIC_SUCCESS'
export const POST_REQUEST_TOPIC_FAILURE = 'POST_REQUEST_TOPIC_FAILURE'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_CALL_INFO = 'UPDATE_CALL_INFO'
export const LOG_OUT = 'LOG_OUT'
export const SHOW_NEW_VOCAB = 'SHOW_NEW_VOCAB'
export const TOGGLE_ACCOUNT = 'TOGGLE_ACCOUNT'

const vocabs = [
    {
        word: "abstract",
        explain: "existing in thought or as an idea but not having a physical or concrete existence"
    },
    {
        word: "glean",
        explain: "collect gradually and bit by bit"
    },
    {
        word: "marvelous",
        explain: "causing great wonder; extraordinary"
    }
]

export const updateEmail = email => {
    console.log('update email invoked')
    return {
        type: UPDATE_EMAIL,
        payload: email
    }
}

export const addTimeSlot = timeSlotInteger => {
    return {
        type: ADD_TIMESLOT,
        payload: timeSlotInteger
    }
}

export const addTopic = topics => {
    return {
        type: ADD_TOPIC,
        payload: topics
    }
}

export const toggleAccount = showAccount => {
    return {
        type: TOGGLE_ACCOUNT,
        payload: showAccount
    }
}

export const updateUserID = userID => {
    return {
        type: ADD_USER_ID,
        payload: userID
    }
}

export const logOut = (curShowAccountState, history) => {
    localStorage.clear()
    localStorage.removeItem('persist:root')
    history.push('/')
    return {
        type: LOG_OUT,
        payload: !curShowAccountState
    }
}

export const showNewVocab = () => {
    return dispatch => {
        axios
            .get(`${API_URL}/api/vocabulary`)
            .then(res => {
                if (res.data && res.data.length > 0){
                    dispatch(
                        {
                            type: SHOW_NEW_VOCAB,
                            payload: res.data[res.data.length - 1]
                        }
                    )
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}



export const postUser = (user, history) => {
    return dispatch => {
        axios
            .post(`${API_URL}/api/users`, user)
            .then(res => {
                localStorage.setItem('userId', res.data.id)
                dispatch({
                    type: ADD_USER_ID,
                    payload: res.data.id
                })
                localStorage.setItem('isAuth', true)
                history.push('/')

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
                localStorage.setItem('request_id', res.data.id)
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

export const postRequestTopic = request_topic_ids => {
    return dispatch => {
        axios
            .post(`${API_URL}/api/topics/withRequest`, request_topic_ids)
            .then(res => {
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

export const updateCallInfo = info => {
    return {
        type: UPDATE_CALL_INFO,
        payload: info
    }
}






