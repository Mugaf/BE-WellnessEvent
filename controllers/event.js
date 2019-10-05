const Event = require('../models/event')
let classEvent = new Event()

exports.Create = (req, res) => {
    const request = req.body
    console.log(req.user)
    classEvent.createEvent(request.eventName, request.eventDetail, 
        request.vendorId, request.proposedDate1, request.proposedDate2, request.proposedDate3,
        req.user.userid)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Event is created!'
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    })
}

exports.Read = (req, res) => {
    const request = req.body
    classEvent.readEvent(request.eventId, req.user.userid)
    .then(result => {
        const data = result.result
        return res.status(200).json({
            success: true,
            message: 'Data Retrieved!',
            data
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    })
}

exports.Reject = (req, req) => {
    const request = req.body
    classEvent.rejectEvent(request.eventId, request.rejectReason, req.user.userid)
    .then(result => {
        const data = result.result
        return res.status(200).json({
            success: true,
            message: 'Data Rejected!',
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    })
}

// exports.Update = (req, res) => {
//     const request = req.body
//     classUser.updateUser(request.eventId, request.eventName,
//         request.eventDetail, request.userId)
//     .then(() => {
//         return res.status(200).json({
//             success: true,
//             message: 'Event is updated!'
//         })
//     })
//     .catch(err => {
//         console.log(err)
//         return res.status(500).json({
//             success: false,
//             message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
//         })
//     }) 
// }

// exports.Delete = (req, res) => {
//     const request = req.body
//     classEvent.deleteEvent(request.eventId)
//     .then(() => {
//         return res.status(200).json({
//             success: true,
//             message: 'Event is deleted!'
//         })
//     })
//     .catch(err => {
//         return res.status(500).json({
//             success: false,
//             message: (process.env.Environment !== 'Production') ? JSON.stringify(err) : 'something when wrong!' 
//         })
//     })
// }