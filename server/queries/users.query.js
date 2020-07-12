const db = require('../database/dbConfig')

//GET all users
function getUsers(){
    return db('users')
            
}


//POST a user
function addUser(user){
    return db('users')
            .returning('id')
            .insert(user)
            .then(ids => ({id: ids[0]}))
}


module.exports = {
    getUsers,
    addUser
}
