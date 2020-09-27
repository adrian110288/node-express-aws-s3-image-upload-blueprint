require('dotenv').config({path: './dev.env'})
const express = require('express');
const storeRouter = require('./routes/store');

const app = express();

app.use(express.urlencoded({limit: '1kb', extended: false}));
app.use(express.json({limit: '2kb'}));

app.use('/store', storeRouter);

module.exports = app;

