const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const filmRouter = require('./routes/films');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/films', filmRouter);

module.exports = app;
