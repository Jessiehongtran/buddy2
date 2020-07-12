const router = require('express').Router()
const {
    getDays,
    addDay
    } = require('../queries/days.query')

//GET days
router.get('/', async (req, res) => {
    try {
        const days = await getDays()
        res.status(200).json(days)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a day
router.post('/', async (req,res) => {
    const day = req.body
    try {
        const id = await addDay(day)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router