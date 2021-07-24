const express = require('express');
const router = express.Router();
const { DaftarUser, LoginUser, getUser } = require('../Controller/userController');
const midle = require('../Midleware/Midle');

router.post('/Daftar', DaftarUser);
router.post('/login', LoginUser);
router.get('/user', midle, getUser);

module.exports = router