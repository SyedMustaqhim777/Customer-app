var express = require("express");
var router = express.Router();
var customerModel = require("../model/customer");
var studentModel = require("../model/student");
var customerMySQL = require("../model/customer-mysql");

/* GET home page. */

router.get("/", function (req, res, next) {
  res.redirect("/login");
  // res.render('index', { title: 'Cusotmer App' });
});

// /rama + /home = /rama/home
router.get("/home", function (req, res, next) {
  res.render("home", { title: "Home Page" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/about", function (req, res, next) {
  res.render("home", { title: "About" });
});

router.get("/student", function (req, res, next) {
  res.render("home", { title: "Student" });
});

router.get("/customer", function (req, res, next) {
  let callback = (records) => {
    res.render("customer", { title: "Customers", customers: records });
  };
  customerMySQL.getCustomers().then(callback);
});

router.get("/customer/add", function (req, res, next) {
  res.render("customerAdd", {
    title: "Add Customer",
    customers: customerModel.getRecords(),
  });
});

router.get("/customer/search/:field/:text", function (req, res, next) {
  let callback = (records) =>
    res.render("customer", { title: "Customers", customers: records });
  customerMySQL
    .getCustomersBySearch(req.params.field, req.params.text)
    .then(callback);
});

router.get("/customer/edit/:id", function (req, res, next) {
  customerMySQL.getCustomerById(req.params.id).then((record) => {
    res.render("customerEdit", { title: "Update Customer", customer: record });
  });
});

// router.get("/customer/search/:key/:value", function (req, res, next) {
//   let key = req.params.key;
//   let value = req.params.value;
//   let customer = customerModel.query(key, value);
//   let customers = [];
//   if (customer) {
//     customers = [customer];
//   }
//   res.render("customer", {
//     title: "Customers",
//     customers: customers,
//   });
// });

module.exports = router;
