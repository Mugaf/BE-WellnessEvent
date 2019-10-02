const Company = require('../models/company')
let classCompany = new Company()

exports.Create = (req, res) => {
    const request = req.body
    classCompany.createCompany(request.companyName, request.companyDetail, request.userId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Company is created!'
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
    classCompany.readCompany(request.companyId)
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
    classUser.updateUser(request.companyId, request.companyName,
        request.companyDetail, request.userId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Company is updated!'
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
    classCompany.deleteCompany(request.companyId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'Company is deleted!'
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? JSON.stringify(err) : 'something when wrong!' 
        })
    })
}