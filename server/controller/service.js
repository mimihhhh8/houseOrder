const serviceModel=require("../model/service");
const userModel=require("../model/user");
//服务列表
const serviceList=async (req,res)=>{
    let data=await serviceModel.serviceList();
    // console.log(data)
    //给前端返回数据用res.json
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:data
        })
    }else{
        res.json({
            code:200,
            info:"数据请求失败"
        })
    }
}
//管理员添加服务
const serviceSave=async (req,res)=>{

    let { workername,workeraddress,servicetype,task,statues,experience}=req.body;
    let data=await serviceModel.serviceSave({ workername,workeraddress,servicetype,task,statues,experience})
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:data
        })
    }else{
        res.json({
            code:200,
            info:"数据请求失败"
        })
    }
}
//修改预约状态
const updateStatues=async (req,res)=>{
    //解构的变量名称与前端payload内的变量名称要一致
    // record为serveList下的index.js中<Switch/>组件中事件on-changge传过来的参数，record代表当前行的所有内容
    let {flag,id ,userid,record}=req.body;
    // console.log(record)
    let data=await serviceModel.updateStatues(flag,id);
    if(data.ok===1&&flag===true){
        let saveOrderList=await userModel.saveOrderInfo(record,userid)
        let userDetailInfoList=await userModel.userDetailInfo(userid)
        res.json({
            code:200,
            errMsg:"",
            info:"预约成功",
            data:data,
            saveOrderList:saveOrderList,
            userDetaiInfoList:userDetailInfoList
        })
    }else if(data.ok===1&&flag===false) {
        res.json({
            code:400,
            info:"您已取消预约"
        })
    }else{
        res.json({
            code:500,
            info:"数据库错误"
        })
    }
}
// 我的订单列表
const mineOrderList=async (req,res)=>{
    let {userId}=req.body;
    
    let list=await userModel.userDetailInfo(userId);
    if(list){
        res.json({
            code:200,
            errMsg:"",
            info:"获取列表成功",
            data:list
        })
    }else{
        res.json({
            code:500,
            errMsg:"",
            info:"获取列表失败",
        })
    }
}
//取消预约
/**
 * 
 * db.mycollection.update(
    {'_id': ObjectId("5150a1199fac0e6910000002")},
    { $pull: { "items" : { id: 23 } } }
); 
 */
const cancleOrder=async (req,res)=>{
    let {flag,id,userId}=req.body
    let cancleOrderList=await serviceModel.cancleOrder(flag,id);
    let setOrder=await userModel.deleteYuyueUser(userId,id);
    if(cancleOrderList&&setOrder){
        res.json({
            code:200,
            errMsg:"",
            info:"取消预约",
            data:cancleOrderList
        })
    }else{
        res.json({
            code:500,
            errMsg:"",
            info:"取消预约失败",
        })
    }
}
module.exports={
    serviceList,
    serviceSave,
    updateStatues,
    mineOrderList,
    cancleOrder
}