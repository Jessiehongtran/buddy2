import {
    UPDATE_EMAIL,
    ADD_USER_ID,
    ADD_TOPIC,
    ADD_DATE_TIME,
    POST_USER_FAILURE,
    UPDATE_REQUEST_ID,
    POST_REQUEST_FAILURE,
    POST_REQUEST_TOPIC_SUCCESS,
    POST_REQUEST_TOPIC_FAILURE 
} from '../actions';

const initialState = {
    email: "",
    topics: [],
    request_id: 0,
    request_topic_id: 0,
    request: {
        user_id: 0,
        day_id: 0,
        time_id: 0,
        timezone_id: 0,
        date: "",
        matched: false
    },
    user_post_error: "",
    request_post_error: "",
    requestTopic_post_error: ""
}

export const reducer = (state=initialState, action) => {

    switch(action.type){
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case ADD_DATE_TIME:
            return {
                ...state,
                request: {
                    ...state.request,
                    day_id: action.payload.day_id,
                    time_id: action.payload.time_id,
                    timezone_id: action.payload.timezone_id,
                    date: action.payload.date
                }
            };
        case ADD_TOPIC: 
            return {
                ...state,
                topics: action.payload
            };
        case ADD_USER_ID:
            return {
                ...state,
                request: {
                    ...state.request,
                    user_id: action.payload
                }
            };
        case POST_USER_FAILURE:
            return {
                ...state,
                user_post_error: action.payload
            };
        case UPDATE_REQUEST_ID:
            return {
                ...state,
                request_id: action.payload
            };
        case POST_REQUEST_FAILURE:
            return {
                ...state,
                request_post_error: action.payload
            };
        case POST_REQUEST_TOPIC_SUCCESS:
            return {
                ...state,
                request_topic_id: action.payload
            };
        case POST_REQUEST_TOPIC_FAILURE:
            return {
                ...state,
                requestTopic_post_error: action.payload
            }
        default:
            return state

    }
}