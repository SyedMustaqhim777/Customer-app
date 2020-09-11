var express = require("express");
var router = express.Router();
//var customerModel = require("../model/customer");
//var customerMySQL = require("../model/customer-mysql");
var customerMongo = require("../model/customer-mongo");

// router.get("/", function (req, res) {
//   let value = req.query.value;
//   let key = req.query.key;
//   if (key && value) {
//     res.send(customerModel.query(key, value));
//   } else {
//     res.send(customerModel.getRecords());
//   }
// });
router.get("/", function (req, res) {
  console.log("hannan");
  customerMongo.getCustomers().then((records) => {
    res.send(records);
  });
});

router.put("/", function (req, res) {
  console.log(req.body);
  customerMongo.updateCustomer(req.body).then((result) => {
    res.send(result);
  });
});

// router.get("/", function (req, res) {
//   let callback = (records) => {
//     console.log("records" + records);
//     res.send(records);
//   };
//   customerMySQL.getCustomers().then(callback);
// });

// router.put("/", function (req, res) {
//   let customer = req.body;
//   customerModel.updateRecord(customer);
//   res.send({ result: "success", msg: "customer updated successfully." });
// });

router.delete("/", function (req, res) {
  let customer = req.body;
  customerMongo.deleteCustomer(customer.id).then((result) => {
    res.send(result);
  });
});

// router.post("/", function (req, res) {
//   customerModel.addRecord(req.body);
//   res.send({ result: "success", msg: "customer added successfully." });
// });

router.post("/", function (req, res) {
  let callback = (result) => res.send(result);
  customerMongo.addCustomer(req.body).then(callback);
});

module.exports = router;
