// object connection mysql
const mysql = require('mysql')
require('dotenv').config()

const connOpt = {
  connectionLimit : 10,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const connPool = mysql.createPool(connOpt)

var connectionCheck = new Promise(
  (resolve, reject) => {
    connPool.getConnection((err, conn) => {
      if(err)
        reject(err)
      else
        resolve('connection success!')
    })
  }
)


module.exports.connectionCheck = connectionCheck
module.exports.connStr = connOpt
module.exports.pool = connPool