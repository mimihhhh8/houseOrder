// model模块 MVC中的M数据的增删改查
const mongoose = require("../utils/database");
// 设置数据库字段
const User = mongoose.model("yuser", {
    username: String,
    password: String,
    status: Boolean,
    registerTime: Number,
    name: String,
    urlPic: String,
    userstatus: String,

    loginid: String,
    phone: Number,
    sex: String,
    age: Number,
    detailaddress: String,

    // 用户预约成功，将订单信息存入用户基本信息中
    orderinfo: Array
})
//.........................
const Data = mongoose.model("hoursd", {
    date: String,
    date_status: String,
    date_type: String,
    hour: String
})
//总数据
const allData = () => {
    return Data.find();
}
const dataFind = () => {
    return Data.find().count();
}
//分页
const hourDataPage = (page, limit) => {
    page = Number(page);
    limit = Number(limit);

    return Data.find().skip((page - 1) * limit).limit(limit);
}
//日期查询
const searchDate = (page, limit, startDate, endDate) => {
    startDate = String(startDate);
    endDate = String(endDate);
    page = Number(page);
    limit = Number(limit);
    return Data.find({ date: { $gte: startDate, $lte: endDate } }).skip((page - 1) * limit).limit(limit);
}
//日期查询出的总条数
const searchDateCount = (startDate, endDate) => {
    startDate = String(startDate);
    endDate = String(endDate);
    return Data.find({ date: { $gte: startDate, $lte: endDate } }).count();
}
//................................
// 查找单个用户的信息
const userFind = (username, value) => {
    return User.find({ username: username, userstatus: value });
    // return User.find();
}
// 保存用户信息,用户注册
const userSave = (userInfo, cb) => {
    let user = new User(userInfo);
    return user.save()
}
//查询用户总信息，前端渲染
const userInfo = () => {
    return User.find()
}
const userPass = (id) => {
    return User.findOne({ _id: id });
}

const updatePass = (id, newpassword) => {
    console.log(id)
    return User.update({ _id: id }, { $set: { password: newpassword } })
}
//用户修改头像
const UpdatePic = (id, urlPic) => {
    return User.update({ _id: id }, { $set: { urlPic: urlPic } });
}
// 查询单个用户信息接口
const userInter = (id) => {
    return User.findOne({ _id: id });
}


//在用户预约列表页，显示预约成功以后，将服务人员的信息存入用户信息中
const saveOrderInfo = (record, userid) => {
    return User.update({ _id: userid }, { $push: { "orderinfo": record } })
}
//获取用户详细信息，包含了订单信息
const userDetailInfo=(userid)=>{
    return User.findOne({ _id: userid });
}
const deleteYuyueUser=(userId,id)=>{
    return User.update(
        {_id:userId},
        {$pull:{"orderinfo":{_id:id}}}
    )
}
module.exports = {
    userFind,
    userSave,
    userPass,
    updatePass,
    UpdatePic,
    userInter,
    deleteYuyueUser,
    dataFind,
    hourDataPage,
    searchDate,
    searchDateCount,
    allData,
    //用户总信息
    userInfo,
    // 将预约成功的服务人员信息存入用户信息中
    saveOrderInfo,
    userDetailInfo
}
