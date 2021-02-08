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

//POST login
function findBy(filter){
    return db('users')
            .where(filter)
            .first()
}

module.exports = {
    getUsers,
    addUser,
    findBy
}
