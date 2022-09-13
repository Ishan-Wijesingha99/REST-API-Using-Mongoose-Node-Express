const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()

const Subscriber = require('../models/subscriber')


// middleware that gets a single subscriber, because so many of the http requests we will be using will involve fetching a single subscriber from the database, just create a middleware that fetches this single subscriber, and use that middleware for all the relevant http requests.
const getSubscriber = async function(req, res, next) {
    let singleSubscriber

    try {
        singleSubscriber = await Subscriber.findById(req.params.id) 

        if(singleSubscriber === null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message})
    }

    res.subscriber = singleSubscriber
    next()
}



// Getting all subs
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()

        res.status(200).json(subscribers)

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})



// Getting one sub
router.get('/:id', getSubscriber, (req, res) => {
    if(!res.subscriber) {
        return res.status(400).json({ message: 'Subscriber does not exist' })
    }

    return res.status(200).json(res.subscriber)
})


// Creating one sub
router.post('/', async (req, res) => {
    try {
        const subscriber = new Subscriber({
            name: req.body.name,
            subscribedTo: req.body.subscribedTo
        })

        const newSubscriber = await subscriber.save()

        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
})

// Updating one sub
router.patch('/:id', getSubscriber, (req, res) => {
    
})

// Deleting one sub
router.delete('/:id', getSubscriber, (req, res) => {
    
})



module.exports = router