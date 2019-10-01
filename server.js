const express = require('express')
const app = express()
const cors = require('cors')
const { pool, connStr, connectionCheck } = require('./config/database')
app.use(cors())

require('dotenv').config()

// check connection
connectionCheck
  .then(result => {
    console.log(result)
  })
  .catch(function (error) {
    console.log("ERROR:", error.message)
  })


const index = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/', index)

const port = process.env.PORT || 3000

let server = app.listen(port, (err, res) => {
    if (err) res.send(err)
    else {
      let domain = (server.address().address === '::') ? 'http://localhost:' + server.address().port
        : server.address().address + ':' + server.address().port
      console.log(`Server is up and running on ${domain}`)
    }
  })

  module.exports = app // for testing
