const UserDao = require("../../dao/user/user_dao.js");
//用户 业务逻辑层
const UserService = {
	//登录
	login(req,res,next){
		//post方式
		const {username, password, email} = req.body;//返回的是一个对象
		//数据访问
		UserDao.find({username})
				.then((data)=>{
//					console.log(data);
					if(data.length === 1){//存在对象
						if(password === data[0].password) {
							res.json({
								res_code:1,
								res_error:"",
								res_body:{
									status:1,
									message:"登录成功",
									data:{
										username:data[0].username
									}
										}
								});
							}else{
								res.json({
									res_code:1,
									res_error:"",
									res_body:{
										status:0,
										message:"密码错误",
										data:{}
									}
								});
							}
//							res.json();
						}else{//不存在对象
							res.json({
								res_code:1,
								res_error:"",
								res_body:{
									status:0,
									message:"用户名不存在",
									data:{}
								}	
							});
						}	
				})
				.catch((err)=>{
					res.json({
						res_code:0,
						res_error:"",
						res_body:{}
					});
				});
	},
	//注册
	register(req,res,next){
//		get方式
//		const {username,password,email} = req.query;

		//post方式
		const {username, password, email} = req.body;//返回的是一个对象

		// 将用户注册信息发送到数据访问层处理
		UserDao.save({username,password,email})
				.then((data)=>{
					res.json({res_code:1,res_error:"",res_body:{status:1,message:"success",data:{username:data.username}}});
				})
				.catch((err)=>{
					res.json({res_code:1,res_error:"",res_body:{status:0,message:"failed"+err,data:{}}});
				});
	},
	check(req,res,next){
		
	},
	//
	logout(req,res,next){
		
	}
}

module.exports = UserService;
