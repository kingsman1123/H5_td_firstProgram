var express = require('express');
var router = express.Router();

//引入captcha
const captcha = require("../services/common/captcha.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


	//生成验证码
	router.get("/api/captcha",captcha.genCaptcha);
	
	//校验
	router.get("/api/captcha/verify",captcha.verifyCaptcha);
	
//导出
module.exports = router;
