const router = require('express').Router();
const {
    getTimes,
    addTime
} = require('../queries/times.query')

//GET times
router.get('/', async (req,res) => {
    try {
        const times = await getTimes()
        res.status(200).json(times)
    }
    catch (err){
        res.status(500).json(err.response)
    }
})


//ADD times
router.post('/', async (req,res) => {
    const time = req.body
    try {
        const id = await addTime(time)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.response)
    }
})


module.exports = router;