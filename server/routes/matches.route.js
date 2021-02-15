const router = require('express').Router();
const matchModel = require('../queries/matches.query')

//POST matches
router.post('/', async (req, res) => {
    const newMatch = req.body
    try {
        const response = await matchModel.addMatch(newMatch)
        res.status(200).json(response) 
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET match by userId
router.get('/:requestID', async (req, res) => {
    const requestID = req.params.userID
    try {
        const response = await matchModel.getMatchByRequestID(requestID)
        res.status(200).json(response)
    } catch (err){
        res.status(500).json(err.message)
    }
})



module.exports = router;