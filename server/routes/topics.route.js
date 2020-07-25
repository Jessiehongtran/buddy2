const router = require('express').Router();
const {
        getTopics,
        addTopic,
        addRequestTopic,
        updateTopic,
        deleteTopic
      } = require('../queries/topics.query')

//GET all topics
router.get('/', async (req,res) => {
    try {
        const topics = await getTopics()
        res.status(200).json(topics)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a topic
router.post('/', async (req,res) => {
    const topic = req.body
    try {
        const id = await addTopic(topic)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//POST a request and topic
router.post('/withRequest', async (req,res) => {
    const request_topic_ids = req.body
    try {
        const id = await addRequestTopic(request_topic_ids)
        res.status(200).json(id)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//UPDATE a topic
router.patch('/:id/edit', async (req,res) => {
    const id = req.params.id
    const change = req.body
    try {
        await updateTopic(id, change)
        res.status(200).json({message: 'updated 1 topic'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


//DELETE a topic
router.delete('/:id/delete', async (req,res) => {
    const id = req.params.id
    try {
        await deleteTopic(id)
        res.status(200).json({message: 'deleted 1 topic'})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = router