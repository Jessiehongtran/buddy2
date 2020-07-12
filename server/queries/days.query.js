const db = require('../database/dbConfig')

//GET days
function getDays(){
    return db('days')
}


//POST a day
function addDay(day){
    return db('days')
            .returning('id')
            .insert(day)
            .then(ids => ({id: ids[0]}))
}


module.exports = {
    getDays,
    addDay
}




