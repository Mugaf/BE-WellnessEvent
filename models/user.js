const { pool } = require('../config/database')
const bcrypt = require('bcrypt')
const { ObjectLength } = require('../lib/codehelper')
const jwt = require('jsonwebtoken')

class User{
    createUser(username, password, firstName, lastName, mobileNo, phoneNo, email, roleId){
        const encPassword = bcrypt.hashSync(password, 10)
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account_user(username, password, firstname, lastname, 
                mobileNo, phoneNo, email, roleid) VALUES (${pool.escape(username)}, ${encPassword},
                ${pool.escape(firstName)}, ${pool.escape(lastName)}, ${pool.escape(mobileNo)},
                ${pool.escape(phoneNo)}, ${pool.escape(email)}, ${pool.escape(roleId)})`,
                (error, result, fields) => {
                    if(error){
                        reject(error)
                    }
                    else{
                        const Queryresult = {result:result, fields: fields}
                        resolve(Queryresult)
                    }
                })
        })
    }
}

module.exports = User