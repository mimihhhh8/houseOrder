import servers from "../servers/servers";

export default {
    //命名空间
    namespace: 'user',
    //处理同步action,
    state:{
        
    },
    reducers: {

    },

    //处理异步action
    //effects异步的方法调用
    effects: {
        //{ reject, resolve, payload }前端传的参数，{ call, put }
        *login({ reject, resolve, payload }, { call, put }) {
            //连接后端，通过yield call
            const res = yield call(servers.login['login'], { payload })
            //异步请求，向(servers.login['login']接口发出请求，传参为payload的值，res可以接受到后台传来的数据
           //
            if(res){
                resolve(res.data)
            }
 
    },
    *register({reject,resolve,payload},{call,put}){
        const res=yield call(servers.register['register'],{payload})
        if(res){
            resolve(res.data)
        }
    },

    *userInfoList({resolve},{call,put}){
        const res=yield call(servers.userInfoList['userInfoList'])
        if(res){
            resolve(res.data)
        }
    }
}
}