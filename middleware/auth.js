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
  }
}
