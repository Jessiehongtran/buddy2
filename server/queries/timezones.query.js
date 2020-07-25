const db = require('../database/dbConfig')

//GET timezones
function getTimeZones(){
    return db('timezones')
}

module.exports = {
    getTimeZones
}