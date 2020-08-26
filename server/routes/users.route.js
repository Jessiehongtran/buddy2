const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secret')
const {
        getUsers,
        addUser,
        findBy
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
    const pwhash = bcrypt.hashSync(user.password, 10)
    user.password = pwhash
    try {
        const id = await addUser(user)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a login
router.post('/login', async (req,res) => {
    let { email, password } = req.body;
    
    findBy({email})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.email}!`,
                    token
                })
            } else {
                res.status(401).json({message: 'Invalid Credentials'});
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;