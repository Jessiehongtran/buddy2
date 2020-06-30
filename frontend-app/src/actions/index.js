export const ADD_PREFERENCE = 'PERFERENCE'
export const ADD_TOPIC = 'ADD_TOPIC'
export const ADD_TIMESLOT = 'ADD_TIMESLOT'

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

export const addTimeslot = timeslots => {


    return {
        type: ADD_TIMESLOT,
        payload: timeslots
    }
}