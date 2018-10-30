//引入"User" 的Model
const {User} = require("../model/model.js")

//数据访问层
const UserDao= {
	//保存
	save(userinfo){// {username:"xiaoming", password:"abc", email:"xiao@qq.com"}
		// 根据 Model 创建 "document(文档)"
		const user = new User(userinfo); 
		
		// 保存到集合中，并返回保存结果的 Promise 对象
		return user.save();
	},
	//查找
	find(condition){
		return User.find(condition);
 	},
//	update(){
//		
//	},
//	delate(){
//		
//	}
}


module.exports = UserDao;