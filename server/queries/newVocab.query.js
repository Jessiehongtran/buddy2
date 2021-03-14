const db = require('../database/dbConfig');

//POST a new word
const addWord = word => {
    return db('newVocab')
            .insert(word)
            .returning('id')
            .then(ids => ({ id: ids[0] }))
}

//GET all new words
const getAllWords = () => {
    return db('newVocab')
}

module.exports = {
    addWord,
    getAllWords
}