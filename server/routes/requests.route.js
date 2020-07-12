const router = require('express').Router()
const {
    addRequest,
    getRequests,
    getRequestById,
    getRequestByUserId,
    updateRequest
      } = require('../queries/requests.query')


//POST a request
router.post('/withTopic/:topic_id', async (req,res) => {
    const request = req.body
    const topicId = req.params.topic_id
    console.log('topicId', topicId)
    addRequest(request)
        .then(response => {
            //get id to post topic_request
            const requestId = response.id
            console.log('requestId', requestId)
            addRequestTopic({
                request_id: requestId,
                topic_id: topicId
            })
            .then(newres => {
                res.status(200).json({request_id: requestId})
            })

        })
        .catch(err => {
            res.status(500).json(err)
        })
       
})



//GET all requests
router.get('/', async (req,res) => {
    try {
        const requests = await getRequests()
        for (let i=0; i< requests.length; i++){
            requests[i] = {
                id: requests[i].id,
                user: {
                    user_id: requests[i].user_id,
                    first_name: requests[i].first_name,
                    last_name: requests[i].last_name,
                    email: requests[i].email,
                },
                day: {
                    day_name: requests[i].day_name,
                    day_int: requests[i].day_int,
                    date: requests[i].date
                },
                time: {
                    time_id: requests[i].time_id,
                    timeslot: requests[i].timeslot,
                    ampm: requests[i].ampm
                },
                topic: {
                    topic_id: requests[i].topic_id,
                    topic_name: requests[i].topic_name
                },
                matched: requests[i].matched

            }
        }
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//GET request by id
router.get('/:request_id', async (req,res) => {
    const request_id = req.params.request_id
    try {
        const request = await getRequestById(request_id)
        res.status(200).json(request)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//GET requests by user_id
router.get('/user/:user_id', async (req,res) => {
    const user_id = req.params.user_id
    try {
        const requests = await getRequestByUserId(user_id)
        res.status(200).json(requests)
    } catch (err){
        res.status(500).json(err.message)
    }
})


//UPDATE a request with request_id
router.patch('/:request_id', async (req,res) => {
    const request_id = req.params.request_id
    const change = req.body
    try {
        await updateRequest(request_id, change)
        res.status(200).json({message: 'Updated 1 request'})
    } catch (err){
        res.status(500).json(err.message)
    }
})


module.exports = router