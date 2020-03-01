var express =require('express');
var router=express.Router();
const serviceController=require("../controller/service");
//服务列表接口
//routes文件夹下新建文件就需要在app.js中引入，然后使用
router.get("/serviceList",serviceController.serviceList);
router.post("/addService",serviceController.serviceSave);
router.post("/updateStatues",serviceController.updateStatues);
router.post("/mineOrderList",serviceController.mineOrderList);
module.exports = router;