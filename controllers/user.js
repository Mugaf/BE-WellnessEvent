const User = require('../models/user')
let classUser = new User()

exports.Create = (req, res) => {
    const request = req.body
    classUser.createUser(request.username, request.password, request.firstname,
        request.lastname, request.mobileNo, request.phoneNo, request.email, request.roleId)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'user is created!'
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
    classUser.readUser(request.userId)
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
    classUser.updateUser(request.userid, request.firstname,
        request.lastname, request.mobileno, request.phoneno, request.email)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'user is updated!'
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
    classUser.deleteUser(request.userid)
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'user is deleted!'
        })
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? JSON.stringify(err) : 'something when wrong!' 
        })
    })
}

exports.Login = (req, res) => {
    const request = req.body
    classUser.loginUser(request.username, request.password)
    .then(data => {
        if(data.success === true){
            return res.status(200).json(data)
        } else {
            return res.status(403).json(data)
        }
    })
    .catch(err =>{
        console.log(err)
        return res.status(500).json({
            success: false,
            message: (process.env.Environment !== 'Production') ? err : 'something when wrong!' 
        })
    })
}

// exports.checkLogin = (req, res) => {
//     const userData = req.user
//     if(userData){
//         return res.status(200).json({
//             success:true,
//             message: 'user granted!'
//         })
//     }
//     else{
//         return res.status(403).json({
//             success: false,
//             message: 'token is invalid!'
//         })
//     }
// }