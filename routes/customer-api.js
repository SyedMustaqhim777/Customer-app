var express = require("express");
var router = express.Router();
var customerModel = require("./model/customer");

router.get("/", function (req, res) {
  let value = req.query.value;
  let key = req.query.key;
  if (key && value) {
    res.send(customerModel.query(key, value));
  } else {
    res.send(customerModel.getRecords());
  }
});

router.put("/", function (req, res) {
  let customer = req.body;
  customerModel.updateRecord(customer);
  res.send({ result: "success", msg: "customer updated successfully." });
});

router.delete("/", function (req, res) {
  let customer = req.body;
  customerModel.deleteRecord(customer);
  res.send({ result: "success", msg: "customer delete successfully." });
});

router.post("/", function (req, res) {
  customerModel.addRecord(req.body);
  res.send({ result: "success", msg: "customer added successfully." });
});

module.exports = router;
