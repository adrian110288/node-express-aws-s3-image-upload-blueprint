require('dotenv').config({ path: './dev.env' })

const express = require('express');
const storeRouter = require('./routes/store');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/store', storeRouter);

module.exports = app;
