var express = require("express");
// var customerService = require("../service/customer-service");
// var customerDbService = require("../service/customerdb-service");
var customerMongo = require("../model/customer-mongo");
var router = express.Router();

router.get("/customer/edit/:id", function (req, res, next) {
  var callback = function (data) {
    res.render("customerEdit", { title: "Update Customer", customer: data });
  };
  customerMongo.getCustomerById(req.params.id).then(callback);
});

router.get("/customer/search/:field/:text", function (req, res, next) {
  let callback = (records) =>
    res.render("customer", { title: "Customers", customers: records });
    customerMongo
    .getCustomersBySearch(req.params.field, req.params.text)
    .then(callback);
});

router.get("/customer/add", function (req, res, next) {
  res.render("customerAdd", { title: "Add Customer" });
});

router.get("/dashboard", function (req, res, next) {
  res.render("index", { title: "Dashboard" });
});

router.get("/about", function (req, res, next) {
  res.render("index", { title: "About" });
});

router.get("/customer", function (req, res, next) {
  var callback = function (data) {
    res.render("customer", { title: "Customer", customers: data });
  };
  customerMongo.getCustomers().then(callback);
});

router.get("/customer/:search", function (req, res, next) {
  res.redirect("/customer");
});

module.exports = router;
