const Role = require('../models/role')
let classRole = new Role()

exports.Create = (req, res) => {
    classRole.createRole(req.body.name, req.body.detail)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'data inserted!'
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
    classRole.readRole(req.body.id)
    .then(result => {
        const data = result.result
        return res.status(200).json({
            success: true,
            message: 'data retrieved!',
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
    classRole.updateRole(req.body.id, req.body.name, req.body.detail)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'data updated!'
        })
    })
    .catch(err =>{
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    })
}

exports.Delete = (req, res) => {
    classRole.deleteRole(req.body.id)
    .then(() => {
        return res.status(200).json({
            error: false,
            message: 'data deleted!'
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })  
    })
}