const express = require('express')
const router = express.Router()

const API = require('./API/index')
// const Pages = require('./Pages/index')
router.get('/', (req, res) => {
    res.status(200).send('<h1>get back</h1>')
})
router.use('/API', API)

module.exports = router
