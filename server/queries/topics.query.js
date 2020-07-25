
const db = require('../database/dbConfig')

//GET all topics
function getTopics(){
    return db('topics')
}


//POST a topic
function addTopic(topic){
    return db('topics')
            .returning('id')
            .insert(topic)
            .then(ids => ({id: ids[0]}))
}

//POST a request and topic
function addRequestTopic(request_topic_ids){
    return db('request_topic')
            .returning('id')
            .insert(request_topic_ids)
            .then(ids => ({id: ids[0]}))
}


//UPDATE a topic
function updateTopic(topic_id, change){
    return db('topics')
            .where({id: topic_id})
            .update(change)
}


//DELETE a topic
function deleteTopic(topic_id){
    return db('topics')
            .where({id: topic_id})
            .del()
}


module.exports = {
    getTopics,
    addTopic,
    addRequestTopic,
    updateTopic,
    deleteTopic
}