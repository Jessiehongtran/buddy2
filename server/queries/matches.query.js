const db = require('../database/dbConfig');

const getMatchByRequestID = (requestID) => {
    return db('matches')
            .where(function(){
                this.where('request1_id', requestID).orWhere('request2_id', requestID)
            })
}

const addMatch = (match) => {
    return db('matches')
            .returning('id')
            .insert(match)
            .then(ids => ({ id: ids[0]}))
}

module.exports = {
    getMatchByRequestID,
    addMatch
}