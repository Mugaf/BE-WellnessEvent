const { pool } = require('../config/database')

class Role{
    createRole(roleName, roleDetail)
    {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO account_role(rolename, roledetail) 
            VALUES (${pool.escape(roleName)}, ${pool.escape(roleDetail)})`, 
            (error, result, fields) => {
                if(error){
                    reject(error)
                }
                else{
                    const Queryresult = {result: result, fields: fields}
                    resolve(Queryresult)
                }
            })
        })
    }

    readRole(roleId)
    {
        let strWhere = (roleId !== undefined)? `WHERE a.roleId=${pool.escape(rolid)} AND isDeleted = 0`
                    : 'WHERE isDeleted = 0'
        return new Promise((resolve, reject) => {
            pool.query(`SELECT a.roleid, a.rolename, a.roledetail FROM account_role a
            ${strWhere}`, (error, result, fields) => {
                if(error){
                    reject(error)
                }
                else {
                    const Queryresult = {result: result, fields: fields}
                    resolve(Queryresult)
                }
            })
        })
    }

    updateRole(roleId, roleName, roleDetail)
    {
        let strWhere = `WHERE roleid=${pool.escape(roleId)} AND isDeleted=0`
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account_role SET rolename=${pool.escape(roleName)}, 
            roledetail=${pool.escape(roleDetail)} ${strWhere}`, (error, result, fields) => {
                if(error){
                    reject(error)
                }
                else {
                    const Queryresult = {result: result, fields: fields}
                    resolve(Queryresult)
                }
            })
        })
    }

    deleteRole(roleId)
    {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE account_role SET isDeleted = 1 WHERE roleid=${pool.escape(roleId)}
             AND isDeleted = 0`, 
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

module.exports = Role