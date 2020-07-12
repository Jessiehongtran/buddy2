const db = require('../database/dbConfig')

//POST a request_topic
function addRequestTopic(request_topic){
    return db('request_topic')
            .returning('id')
            .insert(request_topic)
            .then(ids => ids[0])
}

module.exports = {
    addRequestTopic
}