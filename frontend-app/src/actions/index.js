export const POST_USER = 'POST_USER'
export const ADD_PREFERENCE = 'PERFERENCE'
export const ADD_TOPIC = 'ADD_TOPIC'
export const UPDATE_USER_ID = 'UPDATE_USER_ID'
export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const POST_REQUEST = 'POST_REQUEST'
export const UPDATE_REQUEST_ID = 'UPDATE_REQUEST_ID'
export const POST_REQUEST_TOPIC = 'POST_REQUEST_TOPIC'

export const addPreference = preference => {


    return {
        type: ADD_PREFERENCE,
        payload: preference
    }
}

export const addTopic = topics => {


    return {
        type: ADD_TOPIC,
        payload: topics
    }
}
