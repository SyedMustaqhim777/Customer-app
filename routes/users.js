var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// verify this with Postman
router.post('/login', function(req, res, next) {
	if(req.body.email!="" && req.body.email == req.body.password ){
		res.send ({result:'success', msg:'login is successful.'});
	}else{
		res.send ({result:'fail', msg:'login failed.'});
	}
  res.send('respond with a resource ie. users..');
});


module.exports = router;
