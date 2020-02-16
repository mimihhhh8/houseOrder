//引入依赖
var express =require('express');
//调用express中的router函数
var router=express.Router();
const houseController=require("../controller/house");

// router.get("/houseInfoList",houseController.houseInfoList);
// router.get("/houseInfoCount",houseController.houseInfoCount);
router.get("/renterInfo",houseController.renterInfo);
router.post("/addRenterInfo",houseController.addRenterInfo);
router.post("/clearRenterInfo",houseController.clearRenterInfo);
router.post("/searchAddress",houseController.searchAddress);
router.post("/changeInfo",houseController.changeInfo);
router.post("/addHouseInfo",houseController.addHouse);
router.post("/addHouseList",houseController.addHouseList);
router.post("/deleteInfo",houseController.deleteInfo);
module.exports=router;