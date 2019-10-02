const express = require('express')
const router = express.Router()
const VendorControllers = require('../../../controllers/vendor')

router.route('/')
    .post(VendorControllers.Create)
    .get(VendorControllers.Read)
    .put(VendorControllers.Update)
    .delete(VendorControllers.Delete)

module.exports = router