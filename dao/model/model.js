// 引入 "mongoose" 依赖
const mongoose = require('mongoose');
// 连接数据库：database
mongoose.connect('mongodb://localhost/database');

//Schema-数据结构
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	regTime: Date
});

// Schema-数据结构：职位
const positionSchema = new mongoose.Schema({
	name: String,
	salary: Number,
	company: String,
	logo: String
});

// Model-集合：用户(添加到数据库中)
const User = mongoose.model('user', userSchema);// 对应 "users" 集合 

// Model-集合：职位
const Position = mongoose.model('position', positionSchema);  // 对应 "positions" 集合


//导出
module.exports = {User, Position};
