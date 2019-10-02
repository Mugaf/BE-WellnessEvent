const express = require('express')
const router = express.Router()
const CompanyControllers = require('../../../controllers/company')

router.route('/')
    .post(CompanyControllers.Create)
    .get(CompanyControllers.Read)
    .put(CompanyControllers.Update)
    .delete(CompanyControllers.Delete)

module.exports = router