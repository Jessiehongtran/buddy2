const router = require('express').Router();
const {
        getUsers,
        addUser
      } = require('../queries/users.query')

//GET all users
router.get('/', async (req,res) => {
    try {
        const users = await getUsers()
        res.status(200).json(users)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a user
router.post('/', async (req,res) => {
    const user = req.body
    try {
        const id = await addUser(user)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router;