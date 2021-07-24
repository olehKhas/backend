require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const RouteUser = require('./Component/Router/User');
const RouteCustomer = require('./Customer/RouterCustomer/RouterCustomer');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(res => {
    console.log('database terhubung')
})
.catch(e => {
    console.log('Database Eror')
})

app.use(cors())
app.use(bodyParser.json());
app.use('/', RouteUser)
app.use('/', RouteCustomer)

app.listen(process.env.PORT, (req, res) => {
    console.log(`server run port ${process.env.PORT}`)
})