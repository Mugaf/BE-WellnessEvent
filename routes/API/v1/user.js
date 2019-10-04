const express = require('express')
const router = express.Router()
const Auth = require('../../../middleware/auth')
const UserControllers = require('../../../controllers/user')

router.route('/')
    .post(Auth.isAuth, Auth.isAdmin, UserControllers.Create)
    .get(Auth.isAuth, Auth.isAdmin, UserControllers.Read)
    .put(Auth.isAuth, Auth.isAdmin, UserControllers.Update)
    .delete(Auth.isAuth, Auth.isAdmin, UserControllers.Delete)
router.post('/login',UserControllers.Login)
// router.get('/checklogin', isAuth, UserControllers.checkLogin)

module.exports = router