var express = require("express");
var router = express.Router();
var customerModel = require("../model/customer");
var customerMySQL = require("../model/customer-mysql");

// router.get("/", function (req, res) {
//   let value = req.query.value;
//   let key = req.query.key;
//   if (key && value) {
//     res.send(customerModel.query(key, value));
//   } else {
//     res.send(customerModel.getRecords());
//   }
// });
router.get('/', function (req, res) {
	let callback = (records) =>{
		console.log("records"+records);
		res.send(records);
	}
  customerMySQL.getCustomers().then(callback);
});

router.put("/", function (req, res) {
  let callback = (result) => res.send(result);
  customerMySQL.updateCustomer(req.body, callback);
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
  customerMySQL.deleteCustomer(customer.id).then((result) => {
    res.send(result);
  });
});

// router.post("/", function (req, res) {
//   customerModel.addRecord(req.body);
//   res.send({ result: "success", msg: "customer added successfully." });
// });

router.post("/", function (req, res) {
  let callback = (result) => res.send(result);
  customerMySQL.addCustomer(req.body).then(callback);
});

module.exports = router;
