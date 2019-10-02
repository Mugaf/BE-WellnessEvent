const { pool } = require('../config/database')
const bcrypt = require('bcrypt')
const { ObjectLength } = require('../lib/codehelper')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class User{
    createUser(username, password, firstName, lastName, mobileNo, phoneNo, email, roleId){
        const encPassword = bcrypt.hashSync(password, 10)
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account_user(username, password, firstname, lastname, 
                mobileNo, phoneNo, email, roleid) VALUES (${pool.escape(username)}, 
                ${pool.escape(encPassword)}, ${pool.escape(firstName)}, ${pool.escape(lastName)}, 
                ${pool.escape(mobileNo)}, ${pool.escape(phoneNo)}, ${pool.escape(email)}, 
                ${pool.escape(roleId)})`,
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
    readUser(userId){
        return new Promise((resolve,reject) => {
            let strWhere = ((userId !== undefined)? 
            ` WHERE a.userid=${pool.escape(userId)} AND a.isDeleted = 0`
            : `WHERE a.isDeleted = 0`)
            pool.query(`SELECT a.username, a.firstname, a.lastname, 
            a.mobileNo, a.phoneNo, a.email, 
            b.roleId AS RoleId,b.roleName AS RoleName 
            FROM account_user a 
            LEFT JOIN account_role b ON a.roleId = b.roleId
            ${strWhere}`,
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
    updateUser(userId, firstName, lastName, mobileNo, phoneNo, email){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account_user SET firstname = ${pool.escape(firstName)}, 
            lastname=${pool.escape(lastName)}, mobileNo=${pool.escape(mobileNo)}, 
            phoneNo=${pool.escape(phoneNo)}, email=${pool.escape(email)} 
            WHERE userid=${pool.escape(userId)} AND isDeleted = 0`, 
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
    deleteUser(userId){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account_user SET isDeleted = 1 WHERE userid=${pool.escape(userId)}`,
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
    loginUser(username, password){
        return new Promise((resolve, reject) => {
            pool.query(`SELECT username, password, firstname, lastname FROM account_user
            WHERE username=${pool.escape(username)} AND isDeleted = 0`, (error, result, fields) => {
                if(error){
                    reject(error)
                }
                else{
                    const Queryresult = {result:JSON.parse(JSON.stringify(result[0])), fields: fields}
                    resolve(Queryresult)
                }
            })
        })
        .then(data => {
            if(ObjectLength(data.result) > 0){
                const passIsMatch = bcrypt.compareSync(password, data.result.password)
                if(passIsMatch){
                    delete data.result.password
                    const encToken = jwt.sign(data.result, process.env.JWT_SECRET, {
                        algorithm:'HS256',
                        expiresIn: process.env.JWT_EXPIRESIN
                    })
                    return {
                        success: true,
                        message: 'login success!',
                        data: data.result,
                        token: encToken
                    }
                }
                else{
                    return {
                        success: false,
                        message: 'username or password is not match'
                    }
                }
            }
            else{
                return {
                    success: false,
                    message: 'username or password is not match'
                }
            }
        })
    }
}

module.exports = User