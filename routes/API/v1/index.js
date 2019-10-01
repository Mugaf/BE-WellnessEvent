const express = require('express')
const router = express.Router()
const role = require('./role')

router.get('/test', (req, res) => {
    res.status(200).json({
        body: req.body
    })
})
router.use('/role', role)

module.exports = router