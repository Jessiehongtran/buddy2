import { ADD_PREFERENCE, ADD_TOPIC, ADD_TIMESLOT } from '../actions';

const initialState = {
    student: {
        name: "",
        email: "",
        phone: "",
        college: "",
        speaking_level: "intermediate",
    },
    preference: {
        gender: "",
        same_college: false,
        speaking_level: ""
    },
    topics: [],
    timeslot: {
        date: "",
        time: ""
    }
}

export const reducer = (state=initialState, action) => {

    switch(action.type){
        case ADD_PREFERENCE:
            return {
                ...state,
                preference: action.payload
            };
        case ADD_TOPIC: 
            return {
                ...state,
                topics: [...state.topics, action.payload]
            };
        case ADD_TIMESLOT:
            return {
                ...state,
                timeslot: action.payload
            }
    }
}