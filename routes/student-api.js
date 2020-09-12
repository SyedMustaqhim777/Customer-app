var express = require('express');
var router = express.Router();
var studentModel = require('../model/student');
var studentMySQL = require("../model/student-mysql");
var studentMongo = require("../model/student-mongo");



// router.get('/', function (req, res) {
// 	let callback = (records) =>{
// 		console.log("records"+records);
// 		res.send(records);
// 	}
//   customerMySQL.getCustomers().then(callback);
// });
// router.get('/', function (req, res) {
// 	let call
// 	res.send(studentModel.getRecords());
// });

router.get("/", function (req, res) {
	console.log("hi")
	studentMongo.getStudents().then((students) => {
	  res.send(students);
	});
  });


// router.put('/', function (req, res) {
// 	let student = req.body;
// 	studentMongo.updateRecord(student);
// 	res.send({result:'success', msg:'student updated successfully.'});
// });


router.put("/", function (req, res) {
	console.log(req.body);
	studentMongo.updateStudent(req.body).then((results) => {
		console.log("NO problem")
	    res.send(results);
	});
  });

router.delete('/', function (req, res) {
	let student = req.body;
	studentMongo.deleteStudent(student.id).then((result) => {
		res.send(result);
	});
});


router.post("/", (req, res) => {
	console.log("in api- working")
	let callback = (result) => res.send(result);
	studentMongo.addStudent(req.body).then(callback);
	console.log("got db")
})
module.exports = router;