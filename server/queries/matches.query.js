const db = require('../database/dbConfig');

const getMatchByUserID = (userID) => {
    return db('matches')
            .where(function(){
                this.where('buddy1_ID', userID).orWhere('buddy2_ID', userID)
            })
            .first()
}

const addMatch = (match) => {
    return db('matches')
            .returning('id')
            .insert(match)
            .then(ids => ({ id: ids[0]}))
}

module.exports = {
    getMatchByUserID,
    addMatch
}