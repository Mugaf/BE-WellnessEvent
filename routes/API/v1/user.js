const express = require('express')
const router = express.Router()
const Auth = require('../../../middleware/auth')
const UserControllers = require('../../../controllers/user')

router.route('/')
    .post(Auth.isAdmin, UserControllers.Create)
    .get(Auth.isAdmin, UserControllers.Read)
    .put(Auth.isAdmin, UserControllers.Update)
    .delete(Auth.isAdmin, UserControllers.Delete)
router.post('/login',UserControllers.Login)
// router.get('/checklogin', isAuth, UserControllers.checkLogin)

module.exports = router