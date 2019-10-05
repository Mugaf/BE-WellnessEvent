const { pool } = require('../config/database')

class Vendor{
    createVendor(vendorName, vendorDetail, userId){
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO vendor(vendorname, vendordetail,userid) 
            VALUES(${pool.escape(vendorName)}, ${pool.escape(vendorDetail)}, 
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
    readVendor(vendorId){
        return new Promise((resolve, reject) => {
            let strWhere = (vendorId!==undefined)?
            `WHERE vendorid=${pool.escape(vendorId)} AND isDeleted=0`:''
            pool.query(`SELECT * FROM vendor ${strWhere}`, (error, result, fields) => {
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
    updateVendor(vendorId, vendorName, vendorDetail, userId){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE vendor SET vendorname=${pool.escape(vendorName)}, 
            vendordetail=${pool.escape(vendorDetail)}, userid=${pool.escape(userId)} 
            WHERE vendorid=${pool.escape(vendorId)} AND isDeleted=0`, 
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
    deleteVendor(vendorId){
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE vendor SET isDeleted=1 
            WHERE vendorid=${pool.escape(vendorId)} AND isDeleted = 0`, 
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

module.exports = Vendor 