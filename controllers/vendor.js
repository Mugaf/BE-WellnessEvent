const Vendor = require('../models/vendor')
let classVendor = new Vendor()

exports.Create = (req, res) => {
    const request = req.body
    classVendor.createVendor(request.vendorName, request.vendorDetail, request.userId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Vendor is created!'
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
    classVendor.readVendor(request.vendorId)
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

exports.Update = (req, res) => {
    const request = req.body
    classUser.updateUser(request.vendorId, request.vendorName,
        request.vendorDetail, request.userId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Vendor is updated!'
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    }) 
}

exports.Delete = (req, res) => {
    const request = req.body
    classVendor.deleteVendor(request.vendorId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Vendor is deleted!'
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? JSON.stringify(err) : 'something when wrong!' 
        })
    })
}