import {
    UPDATE_EMAIL,
    ADD_USER_ID,
    ADD_TOPIC,
    ADD_TIMESLOT,
    POST_USER_FAILURE,
    UPDATE_REQUEST_ID,
    POST_REQUEST_FAILURE,
    POST_REQUEST_TOPIC_SUCCESS,
    POST_REQUEST_TOPIC_FAILURE,
    UPDATE_CALL_INFO,
    LOG_OUT,
    SHOW_NEW_VOCAB,
    TOGGLE_ACCOUNT
} from '../actions';

const initialState = {
    email: "",
    topics: [],
    request_id: 0,
    request_topic_id: 0,
    new_vocab: {},
    request: {
        user_id: 0,
        timeSlotInteger: 0,
        matched: false
    },
    user_post_error: "",
    request_post_error: "",
    requestTopic_post_error: "",
    showAccount: false,
    authenticated: false,
    callInfo: {
        roomId: "",
        password: ""
    }
}

export const reducer = (state=initialState, action) => {

    switch(action.type){
        case UPDATE_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case TOGGLE_ACCOUNT:
            return {
                ...state,
                showAccount: action.payload
            }
        case ADD_TIMESLOT:
            return {
                ...state,
                request: {
                    ...state.request,
                    timeSlotInteger: action.payload
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
        case UPDATE_CALL_INFO:
            return {
                ...state,
                callInfo: {
                    roomId: action.payload.roomId,
                    password: action.payload.password
                }
            }
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
        case LOG_OUT:
            return {
                ...state,
                request: {
                    user_id: 0,
                    timeSlotInteger: 0,
                    matched: false
                },
                showAccount: action.payload,
                authenticated: false
            }
        case SHOW_NEW_VOCAB:
            return {
                ...state,
                new_vocab: action.payload
            }
        default:
            return state

    }
}