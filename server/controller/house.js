const houseModel = require("../model/house");
const tokenUtils = require("../utils/token");

//租户个人信息
const renterInfo = async (req, res) => {
    let { id } = req.query;
    let renterInfo = await houseModel.renterInfo(id);
    if (renterInfo) {
        res.json({
            code: 200,
            errMsg: '',
            data: renterInfo
        })
    } else {
        res.json({
            code: 200
        })
    }
}
//添加租户信息
const addRenterInfo = async (req, res) => {
    let { id, name, identify, phone, sex } = req.body;
    let data = await houseModel.saveRenterInfo(id, name, identify, phone, sex);
    if (data) {
        res.json({
            code: 200,
            info: "添加成功"
        })
    } else {
        res.json({
            code: 200,
            info: '添加失败'
        })
    }
}
//退租
const clearRenterInfo = async (req, res) => {
    let { id } = req.body;
    let data = await houseModel.clearRenterInfo(id);
    if (data) {
        res.json({
            code: 200,
            info: "退租成功"
        })
    } else {
        res.json({
            code: 200,
            info: '退租失败'
        })
    }
}
//房屋地址查询及类型查询
const searchAddress = async (req, res) => {
    let { page, limit, keyWords,rentTypes } = req.body;
    console.log(req.body)
    let count = await houseModel.houseInfoCount();
    let dataList = await houseModel.searchAddress(page, limit, keyWords,rentTypes);
    console.log(dataList)
    let keyWordsCount = await houseModel.keyWordsCount(keyWords);
    let rentType = await houseModel.rentTypeSearch();
    let rentTypeCount=await houseModel.rentTypeCount(rentTypes);
    let bothCount=await houseModel.bothCount(keyWords,rentTypes)
    if (dataList) {
        res.json({
            code: 200,
            errMsg: '',
            data: {
                count,
                dataList,
                // 仅房屋地址查询出的数据总条数
                keyWordsCount,
                rentType,
                // 仅出租状态查询出的数据总条数
                rentTypeCount,
                //房屋地址查询及查询房屋状态的数据总条数
                bothCount
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: '',
            data: {
                info: '数据请求失败'
            }
        })
    }

}
//修改房屋信息及个人信息
const changeInfo=async (req,res)=>{
    let {id,houseaddress,housestatus,furniturestatus,rentprice,payways,publicclean,electriccharge,watercharge,housesize}=req.body;
    let infoList=await houseModel.changeInfo(id,houseaddress,housestatus,furniturestatus,rentprice,payways,publicclean,electriccharge,watercharge,housesize)
    
}
//添加房源信息
const addHouse=async (req,res)=>{
    let {houseaddress,housestatus,furniturestatus,rentprice,payways,electriccharge,watercharge,housesize,houseImg}=req.body;
    let houseList=await houseModel.addHouseInfo({houseaddress,housestatus,furniturestatus,rentprice,payways,electriccharge,watercharge,housesize,houseImg})
    console.log(houseList)
    if(houseList){
        res.json({
            code:200,
            errMsg:'',
            data:{
                info:"房源添加成功",
                houseList:houseList, 
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:'',
            data:{
                info:"房源添加失败"
            }
        })
    }
}
//添加房源后显示的房屋列表
const addHouseList=async (req,res)=>{
    let {page,limit}=req.body;
    let data=await houseModel.addHouseList(page,limit);
    let dataCount=await houseModel.houseCount();
    if(data){
        res.json({
            code:200,
            errMsg:'',
            data:{
                info:"success",
                data:data,
                total:dataCount
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:'',
            data:{
                info:"failure"
            }
        })
    }
}
//删除
const deleteInfo=async (req,res)=>{
    let {id}=req.body;
    let deleteData=await houseModel.deleteInfo(id);
    console.log(deleteData)
    if(deleteData){
        res.json({
            code:200,
            errMsg:"",
            info:"删除成功"
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            info:"删除失败"
        })
    }
}
module.exports = {
    // houseInfoList,
    // houseInfoCount,
    renterInfo,
    addRenterInfo,
    clearRenterInfo,
    searchAddress,
    changeInfo,
    addHouse,
    addHouseList,
    deleteInfo
}
