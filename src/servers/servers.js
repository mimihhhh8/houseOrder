const {post,get}=require('../utils/request').default;
export default{
    //登录
    login:{
        login:({payload})=>post('/users/login',payload)
    },
    register:{
        register:({payload})=>post('/users/register',payload)
    },
    //用户信息列表
    userInfoList:{
        userInfoList:()=>get('/users/userInfoList')
    },
    //服务列表
    serviceList:{
        serviceList:()=>get('/service/serviceList')
    },
    //添加服务,这里用到后端接口
    // /service是后端app.js中配置的（app.use("/service",serviceRouter);），/addService是后端routes文件夹下的service.js文件中的写的接口
    //
    serviceSave:{
        serviceSave:({payload})=>post('/service/addService',payload)
    },
    //修改预约状态
    updateStatues:{
        updateStatues:({payload})=>post('/service/updateStatues',payload)
    },
    // 我的订单列表
    mineOrderList:{
        mineOrderList:({payload})=>post('/service/mineOrderList',payload)
    },
    // 取消预约
    
    cancleOrder:{
        cancleOrder:({payload})=>post('/service/cancleOrder',payload)
    },
} 
