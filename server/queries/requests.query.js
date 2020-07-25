const db = require('../database/dbConfig');


//POST a request
function addRequest(request){
    return db('requests')
            .returning('id')
            .insert(request)
            .then(ids => ({id: ids[0]}))
}

//GET all requests
function getRequests(){
    return db('requests as r')
            .join('users as u', 'u.id', 'r.user_id')
            .join('days as d', 'd.id', 'r.day_id')
            .join('times as t', 't.id', 'r.time_id')
            .join('timezones as tz', 'tz.id', 'r.timezone_id')
            .join('request_topic as rt', 'rt.request_id', 'r.id')
            .join('topics as tp', 'tp.id', 'rt.topic_id')
            .select(
                'r.id',
                'u.id as user_id',
                'u.first_name',
                'u.last_name',
                'u.email',
                'd.day_name',
                'd.day_int',
                'r.date',
                'tz.id as timezone_id',
                'tz.value',
                'tz.dif',
                'tz.name',
                't.id as time_id',
                't.timeslot',
                't.ampm',
                'tp.id as topic_id',
                'tp.topic_name',
                'r.matched'
            )
}

//UPDATE a request
function updateRequest(request_id, change){
    return db('requests as r')
            .where({id: request_id})
            .update(change)
            
}


//GET a request by id
function getRequestById(request_id){
    return db('requests as r')
            .where({id: request_id})
            .join('users as u', 'u.id', 'r.user_id')
            .join('days as d', 'd.id', 'r.day_id')
            .join('times as t', 't.id', 'r.time_id')
            .join('request_topic as rt', 'rt.request_id', 'r.id')
            .join('topics as tp', 'tp.id', 'rt.topic_id')
            .then(requests => requests[0])
}

//GET a request by user_id
function getRequestByUserId(user_id){
    return db('requests as r')
            .where({user_id: user_id})
            .join('users as u', 'u.id', 'r.user_id')
            .join('days as d', 'd.id', 'r.day_id')
            .join('times as t', 't.id', 'r.time_id')
            .join('request_topic as rt', 'rt.request_id', 'r.id')
            .join('topics as tp', 'tp.id', 'rt.topic_id')
            .select(
                'u.id as user_id',
                'u.first_name',
                'u.last_name',
                'u.email',
                'd.day_name',
                'd.day_int',
                't.id as time_id',
                't.timeslot',
                't.ampm',
                'tp.id as topic_id',
                'tp.topic_name'
            )

}

module.exports = {
    addRequest,
    getRequests,
    getRequestById,
    getRequestByUserId,
    updateRequest
}