const express = require('express')
const router = express.Router()

// routes below
const v1 = require('./v1')

router.use('/v1', v1)

module.exports = router
