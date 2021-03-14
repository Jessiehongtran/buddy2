const router = require('express').Router();
const vocabModel = require('../queries/newVocab.query');

//GET new vocabs
router.get('/', async (req, res) => {
    try {
        const words = await vocabModel.getAllWords()
        res.status(200).json(words)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a word
router.post('/', async (req, res) => {
    const newWord = req.body
    try {
        const response = await vocabModel.addWord(newWord)
        res.status(200).json(response)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router;