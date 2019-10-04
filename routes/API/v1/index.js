const express = require('express')
const router = express.Router()
const role = require('./role')
const user = require('./user')
const company = require('./company')
const vendor = require('./vendor')
const Auth = require('../../../middleware/auth')
const event = require('./event')

router.get('/test', (req, res) => {
    res.status(200).json({
        body: req.body
    })
})
router.use('/role', Auth.isAuth, Auth.isAdmin, role)
router.use('/user',  user)
router.use('/company', Auth.isAuth, Auth.isAdmin, company)
router.use('/vendor', Auth.isAuth, vendor)
router.use('/event', Auth.isAuth, event)

module.exports = router