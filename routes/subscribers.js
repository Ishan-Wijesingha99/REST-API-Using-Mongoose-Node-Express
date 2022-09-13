const express = require('express')
const router = express.Router()

// Getting all subs
router.get('/', (req, res) => {
    res.send('Hello World')
})



// Getting one sub
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})


// Creating one sub
router.post('/', (req, res) => {
    
})

// Updating one sub
router.patch('/:id', (req, res) => {
    
})

// Deleting one sub
router.delete('/:id', (req, res) => {
    
})



module.exports = router