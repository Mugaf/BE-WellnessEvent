const { pool } = require('../config/database')

class Company{
    createCompany(companyName, companyDetail, userId){
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO company(companyname, companydetail,userid) 
            VALUES(${pool.escape(companyName)}, ${pool.escape(companyDetail)}, 
            ${pool.escape(userId)})`, (error, result, fields) => {
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
    readCompany(companyId){
        return new Promise((resolve, reject) => {
            let strWhere = (companyId===undefined)?
            `WHERE companyid=${pool.escape(companyId)} AND isDeleted=0`:''
            pool.query(`SELECT * FROM company ${strWhere}`, (error, result, fields) => {
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
    updateCompany(companyId, companyName, companyDetail, userId){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE company SET companyname=${pool.escape(companyName)}, 
            companydetail=${pool.escape(companyDetail)}, userid=${pool.escape(userId)} 
            WHERE companyid=${pool.escape(companyId)} AND isDeleted=0`, 
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
    deleteCompany(companyId){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE company SET isDeleted=1 
            WHERE companyid=${pool.escape(companyId)} AND isDeleted = 0`, 
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

module.exports = Company 