const express = require('express');
const router = express.Router();
const { DaftarUser, createImage, getImage, getSingelImage, delData, kirimEmail, update } = require('../ControllerCustomer/ControlCustomer');

router.post('/Daftar1', DaftarUser);
router.post('/createimage', createImage);
router.get('/getimage', getImage);
router.get('/getsingleimage/:namaImage', getSingelImage)
router.delete('/delete/:id', delData );
router.put('/kirim', kirimEmail);
router.put('/update/:id', update);

module.exports = router