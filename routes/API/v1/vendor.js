const express = require('express')
const router = express.Router()
const VendorControllers = require('../../../controllers/vendor')
const Auth = require('../../../middleware/auth')

router.route('/')
    .post(Auth.isAdmin, VendorControllers.Create)
    .get(VendorControllers.Read)
    .put(Auth.isAdmin, VendorControllers.Update)
    .delete(Auth.isAdmin, VendorControllers.Delete)

module.exports = router