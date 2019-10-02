const express = require('express')
const router = express.Router()
const role = require('./role')
const user = require('./user')

router.get('/test', (req, res) => {
    res.status(200).json({
        body: req.body
    })
})
router.use('/role', role)
router.use('/user', user)

module.exports = router