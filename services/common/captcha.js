//svg验证码
var svgCaptcha = require('svg-captcha');

const Captcha = {
	//生成验证码
	genCaptcha (req,res,next){
			//创建验证码对象
			var captcha = svgCaptcha.createMathExpr({color:true});
			//将验证码保存在session中
			req.session.captcha = captcha.text;
			//将验证码<svg>标签返回到浏览器
			res.status(200).json({
						res_code:1,
						res_error:"",
						res_body:{
							data:captcha.data
						}
			});
	},
	//校验验证码
	verifyCaptcha (req,res,next){
		// 获得请求中传递到服务器的验证码字符串
		const {code} = req.query;
		// 比较验证码输入是否正确：与生成时在 session 中保存的验证码文本字符串比较
		var valid;
		if(code.toUpperCase() === req.session.captcha.toUpperCase()){
				valid = true;
		}else{
			valid = false;
		}
		//响应
		res.json({
				res_code:1,
				res_eror:"",
				res_body:{
					valid
				}
		});
	}
}

module.exports = Captcha;