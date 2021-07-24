const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    namaDepan: {
        type: String
    },
    namaBelakang: {
        type: String
    },
    alamat: {
        type: String
    },
    email: {
        type: String
    }, 
    kota: {
        type: String
    },
    kodePos: {
        type: String
    },
    provinsi: {
        type: String
    },
    total: {
        type: String
    },
    product: {
            type: String
        },
    jumlah: {
        type: String
    },
    status: {
        type: Number
    }
})

module.exports = mongoose.model('User', userSchema);