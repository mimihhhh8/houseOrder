import servers from "../servers/servers";

export default {
    namespace:'service',
    state:{

    },
    reducers:{

    },
    effects:{
        *serviceList({reject,resolve},{call,put}){
            const res=yield call(servers.serviceList['serviceList'])
            // console.log(res)
            if(res){
                resolve(res.data)
            }
        },
        *serviceSave({reject,resolve,payload},{call,put}){
            const res=yield call(servers.serviceSave['serviceSave'],{payload})
            if(res){
                resolve(res.data)
            }
        },
        //修改状态
        *updateStatues({reject,resolve,payload},{call,put}){
            const res=yield call(servers.updateStatues['updateStatues'],{payload})
            console.log(res)
            if(res){
                resolve(res)
            }
        }
    }
}