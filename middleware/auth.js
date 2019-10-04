const jwt = require('jsonwebtoken')

module.exports = {
  isAuth: (req, res, next) => {
    try {
      const token = req.headers['x-access-token']
      let decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (err) {
      res.status(401).json({
        success: false, message: 'Token is Invalid' + ', ' + err.message
      })
    }
  },
  isAdmin: (req, res, next) => {
    try {
      const roleid = req.user.roleid
      if (roleid == 1) next()
      else {
        res.status(401).json({
          success: false, message: 'Not Authorized'
        })
      }
    } catch (err) {
      res.status(401).json({
        success: false, message: 'Token is Invalid' + ', ' + err.message
      })
    }
  },
  isVendor: (req, res, next) => {
    try {
      const roleid = req.user.roleid
      if (roleid == 1 || roleid == 2) next()
      else {
        res.status(401).json({
          success: false, message: 'Not Authorized'
        })
      }
    } catch (err) {
      res.status(401).json({
        success: false, message: 'Token is Invalid' + ', ' + err.message
      })
    }
  },
  isHR: (req, res, next) => {
    try {
      const roleid = req.user.roleid
      if (roleid == 1 || roleid == 3) next()
      else {
        res.status(401).json({
          success: false, message: 'Not Authorized'
        })
      }
    } catch (err) {
      res.status(401).json({
        success: false, message: 'Token is Invalid' + ', ' + err.message
      })
    }
  }
}
