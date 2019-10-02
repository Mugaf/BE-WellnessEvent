const express = require('express')
const router = express.Router()
// const { isAuth } = require('../../../middleware/auth')
const UserControllers = require('../../../controllers/user')

router.route('/')
    .post(UserControllers.Create)
    .get(UserControllers.Read)
    .put(UserControllers.Update)
    .delete(UserControllers.Delete)
router.post('/login',UserControllers.Login)
// router.get('/checklogin', isAuth, UserControllers.checkLogin)

module.exports = router