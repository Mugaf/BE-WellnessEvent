const express = require('express')
const router = express.Router()
const RoleControllers = require('../../../controllers/role')

router.route('/')
    .post(RoleControllers.Create)
    .get(RoleControllers.Read)
    .put(RoleControllers.Update)
    .delete(RoleControllers.Delete)

module.exports = router