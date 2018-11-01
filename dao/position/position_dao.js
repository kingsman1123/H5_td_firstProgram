const {Position} = require("../model/model.js");
const PositionDao = {
	//保存
	save(positionInfo){
		const position = new Position(positionInfo);
		return position.save();  //方法返回(以promise对象形式返回)
	},
	//分页查询的方法
	findByPage(page){
		const pageSize = 5;
		return Position.find({}).limit(pageSize).skip((page-1)*pageSize);
	}
};

module.exports = PositionDao;