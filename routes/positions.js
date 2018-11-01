var express = require('express');
var router = express.Router();
var path = require("path");
const PositionService = require("../services/position/position_services.js");

// 引入上传文件的 multer
const multer = require("multer");

// 配置：服务器的磁盘中保存
var storage = multer.diskStorage({
  // 目标目录
  destination: function (req, file, cb) {
  	 cb(null, path.join(__dirname, "../public/images/upload/"));//组合起来
  },
  // 存储在服务器上的文件名
  filename: function (req, file, cb) {
  	// 文件后缀
  	const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
})
 
var upload = multer({ storage: storage });

// 添加职位
// 完整URL: "/api/positions/add"
router.post("/add", upload.single("logo"), PositionService.add);

//按页查询职位
//"/api/positions/find_by_page?page=?"
router.get("/find_by_page",PositionService.findByPage);

module.exports = router;
