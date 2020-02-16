// 引入依赖
var express = require('express');
// 调用express中的router函数
var router = express.Router();
const userController=require("../controller/user")
// 注册接口
router.post("/register",userController.userRegister);
//用户信息列表
router.get("/userInfoList",userController.userInfo);


// 登陆接口
router.post("/login",userController.userLogin)
//修改密码
router.post("/password",userController.userPassword)
router.post("/urlPic",userController.userPic)
// 用户管理接口
router.post("/Inter",userController.userInter)
//
router.post("/dataInfo",userController.dataAllInfo)
router.get("/hourDataList",userController.hourDataList)
// router.get("/searchDate",userController.searchDate)
router.get("/searchDateCount",userController.searchDateCount)
module.exports = router;
