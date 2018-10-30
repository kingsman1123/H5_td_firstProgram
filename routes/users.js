var express = require('express');
var router = express.Router();

const userService = require("../services/user/user_services.js")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


	//login 完整路径"/api/users/login"
	router.post('/login',userService.login);
	
	router.post('/register',userService.register);
		
	router.get('/logout',userService.logout);
	
	
module.exports = router;
