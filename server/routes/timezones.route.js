const router = require('express').Router()
const { getTimeZones } = require('../queries/timezones.query')

//GET all timezones
router.get('/', async (req,res) => {
    try {
        const timezones = await getTimeZones()
        res.status(200).json(timezones)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router