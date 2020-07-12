const db = require('../database/dbConfig')

//GET times
function getTimes(){
    return db('times')

}


//POST a time
function addTime(time){
    return db('times')
            .returning('id')
            .insert(time)
            .then(ids => ({id: ids[0]}))
}

module.exports = {
    getTimes,
    addTime
}