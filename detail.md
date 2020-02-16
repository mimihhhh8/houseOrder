前后端启动都是用:npm start

一、手动写路由在.umirc.js中

二、前后端的连接

（1）在utils文件夹下的reques.js文件中封装请求需要用到的post、get等方法。

（2）在servers文件夹下的servers.js文件中写走后端的接口，payload是前端传的参数

 login:{

​        login:({payload})=>post('/users/login',payload)

​    }

（3）models文件夹下的user.js中的effects方法是异步方法调用

effects: {

​        //{ reject, resolve, payload }前端传的参数，{ call, put }

​        *login({ reject, resolve, payload }, { call, put }) {

​            //连接后端，通过yield call

​            const res = yield call(servers.login['login'], { payload })

​            console.log(res)

 

​    }

}

（4）页面将前端数据返回给后端home文件夹下的index.js文件中

三、注册

username

loginid

phone

sex

password

age

detailaddress

四、管理员添加家政服务项目

四类：

月嫂：照顾婴幼儿

钟点工：进行按时付费，做饭烹饪，照顾老人，清洁家务。

保姆：

家庭教师：辅导学生作业，品德培养。

家庭维修员：维修水电，电脑，电器，门锁。