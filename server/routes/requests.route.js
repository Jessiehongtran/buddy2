const router = require('express').Router()
const {
    addRequest,
    getRequests,
    getRequestById,
    getRequestByUserId,
    updateRequest
      } = require('../queries/requests.query')


//POST a request
router.post('/', async (req,res) => {
    const request = req.body
    try {
        const request_id = await  addRequest(request)
        res.status(200).json(request_id)
    } catch (err){
        res.status(500).json(err.message)
    }   
})

//GET all requests
router.get('/', async (req,res) => {
    try {
        const requests = await getRequests()
        if (requests.length > 0){
            preRequest = requests[0]
            output = []
            topics = [
                {
                    topic_id: requests[0].topic_id,
                    topic_name: requests[0].topic_name
                }
            ]
            for (let i=0; i< requests.length; i++){
                console.log('requests[i]', requests[i])

                if (i > 0){
                    if (requests[i].id === preRequest.id){
                        topics.push({
                            topic_id: requests[i].topic_id,
                            topic_name: requests[i].topic_name
                        })
                    } else {
                        preRequest = requests[i]
                        output.push({
                            id: preRequest.id,
                            user: {
                                user_id: preRequest.user_id,
                                first_name: preRequest.first_name,
                                last_name: preRequest.last_name,
                                email: preRequest.email
                            },
                            timeSlotInteger: preRequest.timeSlotInteger,
                            topics: topics,
                            matched: preRequest.matched
                        })
                        topics = []
                        topics.push({
                            topic_id: requests[i].topic_id,
                            topic_name: requests[i].topic_name
                        })
                    }
                }
            }

            if (topics.length > 0){
                output.push({
                    id: preRequest.id,
                    user: {
                        user_id: preRequest.user_id,
                        first_name: preRequest.first_name,
                        last_name: preRequest.last_name,
                        email: preRequest.email
                    },
                    timeSlotInteger: preRequest.timeSlotInteger,
                    topics: topics,
                    matched: preRequest.matched
                })
             }
        }
        res.status(200).json(output)
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
