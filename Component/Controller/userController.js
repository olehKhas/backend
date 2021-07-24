require('dotenv').config();
const Login_Admin = require('../Models/UserModels');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

exports.DaftarUser = async (req, res) => {
    const { username, password } = req.body

    const hashPassword = await bcryptjs.hash(password, 10) 
    const user = new Login_Admin({
        username: username,
        password: hashPassword,
    })

    user.save()

    return res.status(201).json({
        message: 'User Berhasil Didaftarkan',
    }) 
}



exports.LoginUser = async (req, res) => {
    const { username, password } = req.body

    const datauser = await Login_Admin.findOne({username: username})
    console.log(datauser)
    if(datauser) {

        const passwordUser = await bcryptjs.compare(password, datauser.password)
        if(passwordUser) {
            
            const data = {
                id: datauser._id
            }
            
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message: 'Berhasi',
                token: token
            })
        }
           
    } else {
        return res.status(404).json({
            message: 'user atau pass salah'
        })
    }
}

exports.getUser = async (req,res) => {
    console.log(req.id)
    const user = await Login_Admin.findOne({_id: req.id})
    return res.status(200).json({
        message: 'berhasi di panggil',
        data: user
    })
}