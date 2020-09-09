var express = require('express');
var router = express.Router();
var studentModel = require('./model/student');

router.get('/', function (req, res) {
	res.send(studentModel.getRecords());
});

router.put('/', function (req, res) {
	let student = req.body;
	studentModel.updateRecord(student);
	res.send({result:'success', msg:'student updated successfully.'});
});

router.delete('/', function (req, res) {
	let student = req.body;
	studentModel.deleteRecord(student);
	res.send({result:'success', msg:'student delete successfully.'});
});

router.post('/', function (req, res) {
	studentModel.addRecord(req.body);
	res.send({result:'success', msg:'student added successfully.'});
});

module.exports = router;