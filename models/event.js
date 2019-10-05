const { pool } = require('../config/database')

class Event{
    createEvent(eventName, eventDetail, vendorId, proposedDate1, proposedDate2, 
        proposedDate3, userId){
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO event(name, detail, companyid, vendorid, proposeddate1, 
                proposeddate2, proposeddate3, status, createdBy, updatedBy) 
            SELECT 
            ${pool.escape(eventName)}, 
            ${pool.escape(eventDetail)}, 
            a.companyid,
            ${pool.escape(vendorId)}, 
            ${pool.escape(proposedDate1)}, 
            ${pool.escape(proposedDate2)}, 
            ${pool.escape(proposedDate3)}, 
            'PENDING', 
            b.firstname, 
            b.firstname  
            FROM company a
            LEFT JOIN account_user b ON a.userid=b.userid 
            WHERE a.userid = ${pool.escape(userId)}`, 
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
    readEvent(eventId, userId){
        return new Promise((resolve, reject) => {
            let strWhere = (eventId!==undefined)?
            `WHERE a.eventid=${pool.escape(eventId)} AND a.isDeleted=0
             AND (c.userid = ${pool.escape(userId)} OR b.userid = ${pool.escape(userId)})`:
            `WHERE a.isDeleted = 0 AND 
            (c.userid = ${pool.escape(userId)} OR b.userid = ${pool.escape(userId)})`
            const query = `SELECT a.*, c.vendorname 
            FROM event a 
            LEFT JOIN company b ON a.companyid=b.companyid
            LEFT JOIN vendor c ON a.vendorid=c.vendorid
            ${strWhere}`
            pool.query(query, (error, result, fields) => {
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
    rejectEvent(eventId, rejectReason, userId){
        return new Promise((resolve, reject) => {
            let query = `UPDATE event SET status='REJECTED', rejectReason=${pool.escape(rejectReason)}, 
            updatedBy=(SELECT firstname FROM account_user WHERE userid=${pool.escape(userId)}) 
            WHERE eventid = ${pool.escape(eventId)}`
            pool.query(query, (error, result, fields) => {
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

    approveEvent(eventId, confirmedDate, userId){
        return new Promise((resolve, reject) => {
            let query = `UPDATE event SET status='APPROVED', confirmeddate=${pool.escape(confirmedDate)}, 
            updatedBy=(SELECT firstname FROM account_user WHERE userid=${pool.escape(userId)}) 
            WHERE eventid = ${pool.escape(eventId)}`
            pool.query(query, (error, result, fields) => {
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
    // updateEvent(eventId, eventName, eventDetail, userId){
    //     return new Promise((resolve, reject) => {
    //         pool.query(`UPDATE event SET eventname=${pool.escape(eventName)}, 
    //         eventdetail=${pool.escape(eventDetail)}, userid=${pool.escape(userId)} 
    //         WHERE eventid=${pool.escape(eventId)} AND isDeleted=0`, 
    //         (error, result, fields) => {
    //             if(error){
    //                 reject(error)
    //             }
    //             else{
    //                 const Queryresult = {result:result, fields: fields}
    //                 resolve(Queryresult)
    //             }
    //         })
    //     })
    // }
    // deleteEvent(eventId){
    //     return new Promise((resolve, reject) => {
    //         pool.query(`UPDATE event SET isDeleted=1 
    //         WHERE eventid=${pool.escape(eventId)} AND isDeleted = 0`, 
    //         (error, result, fields) => {
    //             if(error){
    //                 reject(error)
    //             }
    //             else{
    //                 const Queryresult = {result:result, fields: fields}
    //                 resolve(Queryresult)
    //             }
    //         })
    //     })
    // }
}

module.exports = Event 