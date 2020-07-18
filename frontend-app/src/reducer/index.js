import { ADD_PREFERENCE, ADD_TOPIC } from '../actions';

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
    request_id: 0,
    request: {
        user_id: 0,
        day_id: 0,
        time_id: 0,
        date: "",
        matched: false
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
        
    }
}