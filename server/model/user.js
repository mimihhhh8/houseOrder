// model模块 MVC中的M数据的增删改查
const mongoose=require("../utils/database");
// 设置数据库字段
const User=mongoose.model("yuser",{
    username:String,
    password:String,
    status:Boolean,
    registerTime:Number,
    name:String,
    urlPic:String,
    userstatus:String,

    loginid:String,
    phone:Number,
    sex:String,
    age:Number,
    detailaddress:String
})
//.........................
const Data=mongoose.model("hoursd",{
    date:String,
    date_status:String,
    date_type:String,
    hour:String
})
//总数据
const allData=()=>{
    return Data.find();
}
const dataFind=()=>{
    return Data.find().count();
}
//分页
const hourDataPage=(page,limit)=>{
    page=Number(page);
    limit=Number(limit);
    
    return Data.find().skip((page-1)*limit).limit(limit);
}
//日期查询
const searchDate=(page,limit,startDate,endDate)=>{
    startDate=String(startDate);
    endDate=String(endDate);
    page=Number(page);
    limit=Number(limit);
    return Data.find({date:{$gte:startDate,$lte:endDate}}).skip((page-1)*limit).limit(limit);
}
//日期查询出的总条数
const searchDateCount=(startDate,endDate)=>{
    startDate=String(startDate);
    endDate=String(endDate);
    return Data.find({date:{$gte:startDate,$lte:endDate}}).count();
}
//日期类型的查询
// const dateType=()=>{

// }
//................................
// 查找单个用户的信息
const userFind=(username,value)=>{
    return User.find({username:username,userstatus:value});
	// return User.find();
}
// 保存用户信息,用户注册
const userSave=(userInfo,cb)=>{
    let user=new User(userInfo);
    return user.save()
}
//查询用户总信息，前端渲染
const userInfo=()=>{
    return User.find()
}
const userPass=(id)=>{
    return  User.findOne({_id:id});
}

const updatePass=(id,newpassword)=>{
    console.log(id)
    return  User.update({_id:id},{$set:{password:newpassword}})
}
//用户修改头像
const UpdatePic=(id,urlPic)=>{
    return User.update({_id:id},{$set:{urlPic:urlPic}});
}
// 查询单个用户信息接口
const userInter=(id)=>{
    return User.findOne({_id:id});
}



module.exports={
    userFind,
    userSave,
    userPass,
    updatePass,
    UpdatePic,
    userInter,

    dataFind,
    hourDataPage,
    searchDate,
    searchDateCount,
    allData,
    //用户总信息
    userInfo
}
