const express = require('express')
const router = express.Router()
const EventControllers = require('../../../controllers/event')
const Auth = require('../../../middleware/auth')

router.route('/')
    .post(Auth.isHR, EventControllers.Create)
    .get(EventControllers.Read)
    // .put(EventControllers.Update)
    // .delete(EventControllers.Delete)
router.put('/reject', Auth.isVendor, EventControllers.Reject)
router.put('/approve', Auth.isVendor, EventControllers.Approve)

module.exports = router