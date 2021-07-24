require('dotenv').config();
const User = require('../ModelsCustomer/ModelCustomer');
const bcryptjs = require('bcryptjs');
const Formidable  = require('formidable');
const path = require('path');
const fs = require('fs');
const { SendEmail } = require('../KirimEmail/kirim');


exports.DaftarUser = async (req, res) => {
    const { username, password } = req.body

    const hashPassword = await bcryptjs.hash(password, 10) 
    const user = new User({
        username: username,
        password: hashPassword,
    })

    user.save()

    return res.status(201).json({
        message: 'User Berhasil Didaftarkan',
    }) 
}


exports.createImage = (req, res) => {
    const form = new Formidable.IncomingForm()
    form.multiples = true
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
        const { namaDepan, namaBelakang, alamat, email, kota, kodePos, provinsi, total, product, jumlah, status} = fields
        const { image } = files
        let user = new User()
        user.namaDepan = namaDepan,
        user.namaBelakang = namaBelakang
        user.alamat = alamat
        user.email = email
        user.kota = kota
        user.kodePos = kodePos
        user.provinsi = provinsi
        user.total = total
        user.product = product
        user.jumlah = jumlah
        user.image = image.name
        user.status = status
        await user.save()
    })
    
    form.on('fileBegin', function (name, file){
        if(name === 'image'){
                file.path = path.resolve('./Asset/image', file.name);
        }
    })

    form.on('end', () => {
        return res.status(201).json({
            message: 'Berhasil di Upload'
        })
    })
}

exports.getSingelImage = (req, res) => {
    console.log(req.params)
    const {namaImage} = req.params
    fs.readFile(`./Asset/image/${namaImage}`,(err, data) => {
        res.writeHead(200, {
            'Content-Type': 'image/png'
        })
        res.end(data)
    })
}

exports.delData = async (req, res) => {
    const {id} = req.params
    await User.findOneAndDelete({_id: id})
    return res.status(201).json({
        status: true,
        message: "Berhasil di hapus"
    })
}

exports.getImage = async (req, res) => {
    const user = await User.find().select('_id image namaDepan namaBelakang alamat email kota kodePos provinsi total product jumlah status')
    return res.status(200).json({
        status: true,
        data: user
    })
}

exports.update = async (req, res) => {
    const {id} = req.params
    const{status} = req.body

    const post = await User.findOne({_id: id}).select('-__v')
    post.status = 1
    await post.save()
}

exports.kirimEmail = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({email: email})
    if(!user) {
        console.log(user)
        return res.status(200).json({
            status: false,
            message: 'email tidak tersedia'
        })
    }
    const tamplet = {
        from: "'Oleh-Oleh Bangka' <no-reply@gmail.com>",
        to: email,
        subject: 'Belanjaan Anda',
        html: '<h2>Terima Kasih Sudah Berbelanja di Oleh-Oleh Bangka Belitung</h2> <p>Kami sudah Mengkonfirmasi belanjaan anda dan Pembayaran anda sudah Kami terima, kami akan segera mengirim barang belanjaan anda</p> <p>Terima Kasih</p>'
    }
    SendEmail(tamplet)
    return res.status(200).json({
        status: true,
        message: 'Pembayaran Berhasil dikonfirmasi, Email'
    })
}