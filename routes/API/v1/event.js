const express = require('express')
const router = express.Router()
const EventControllers = require('../../../controllers/event')

router.route('/')
    .post(EventControllers.Create)
    .get(EventControllers.Read)
    // .put(EventControllers.Update)
    // .delete(EventControllers.Delete)

module.exports = router