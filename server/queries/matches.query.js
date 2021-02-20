const db = require('../database/dbConfig');

const getMatchByRequestID = (requestID) => {
    return db('matches as m')
            .where(function(){
                this.where('request1_id', requestID).orWhere('request2_id', requestID)
            })
            .join('requests as r', function(){
                this.on('r.id', '=', 'm.request1_id').orOn('r.id', '=', 'm.request2_id')
            })
            .join('users as u', 'u.id', 'r.user_id')
}

const addMatch = (match) => {
    return db('matches')
            .returning('id')
            .insert(match)
            .then(ids => ({ id: ids[0]}))
}

const getMatches = () => {
    return db('matches')
}

module.exports = {
    getMatchByRequestID,
    addMatch,
    getMatches
}