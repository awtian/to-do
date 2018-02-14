//NPM Dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const FB = require('fb');
require('dotenv').config()


//Routes
const todo = require('./routes/todo');
const user = require('./routes/user');

//start express
const app = express();

//start dependencies

mongoose.connect(`mongodb+srv://admin:${process.env.MONGOPASS}@default-oc7kx.mongodb.net/test`);
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//routing
app.use('/', user);
app.use('/todo', todo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
