const serviceModel=require("../model/service");
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
    let {flag,id}=req.body;
    let data=await serviceModel.updateStatues(flag,id);
    if(data){
        res.json({
            code:200,
            errMsg:"",
            info:"预约成功",
            data:data
        })
    }else{
        res.json({
            code:200,
            info:"预约失败"
        })
    }
}
module.exports={
    serviceList,
    serviceSave,
    updateStatues
}