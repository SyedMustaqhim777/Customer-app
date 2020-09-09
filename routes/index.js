var express = require('express');
var router = express.Router();
var customerModel = require('./model/customer');
var studentModel = require('./model/student');



/* GET home page. */


router.get('/', function(req, res, next) {
  res.redirect("/login");
    //res.render('index', { title: 'Cusotmer App' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Mus' });
});

// /rama + /home = /rama/home
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/customer', function(req, res, next) {
  res.render('customer', { title: 'Customers', customers:customerModel.getRecords()});
});

router.get('/customer/add', function(req, res, next) {
  console.log('Hannan', customerModel.getRecords())
  res.render('customerAdd', { title: 'Add Customer', customers:customerModel.getRecords()});
});

router.get('/customer/edit/:id', function(req, res, next) {
    console.log("id:"+req.params.id);
  res.render('customerEdit', { title: 'Update Customer', customer:customerModel.getRecordById(req.params.id)});
});

router.get('/student', function(req, res, next) {
  res.render('student', { title: 'student', students:studentModel.getRecords()});
});

router.get('/student/add', function(req, res, next) {
  res.render('studentAdd', { title: 'Add Customer', students:studentModel.getRecords()});
});

module.exports = router;