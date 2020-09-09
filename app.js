var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Import Route Config
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiCustomer = require('./routes/customer-api');
var apiStudent = require('./routes/student-api.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //this is where you can find UI 
app.set('view engine', 'ejs'); //this is the framework/engine that it uses

app.use(logger('dev')); //this is how i want to show logs
app.use(express.json()); //this application uses json

//Browser config
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

//copy all inside public and use in html files.
app.use(express.static(path.join(__dirname, 'public')));

//setting route config
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/customer', apiCustomer)
app.use('/api/student', apiStudent)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
