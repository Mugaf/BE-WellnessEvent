const express = require('express')
const router = express.Router()
const role = require('./role')
const user = require('./user')
const company = require('./company')

router.get('/test', (req, res) => {
    res.status(200).json({
        body: req.body
    })
})
router.use('/role', role)
router.use('/user', user)
router.use('/company', company)

module.exports = router