import React, { Component } from 'react'
import { connect } from 'dva';
import { Table, Switch,message } from 'antd';
//render  https://segmentfault.com/q/1010000020513212/
class index extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            flag: '',
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'workername',
                    key: 'workername',
                },
                {
                    title: '地址',
                    dataIndex: 'workeraddress',
                    key: 'workeraddress',
                },
                {
                    title: '服务类型',
                    dataIndex: 'servicetype',
                    key: 'servicetype',
                },
                {
                    title: '任务',
                    dataIndex: 'task',
                    key: 'task',
                },
                {
                    title: '工龄',
                    dataIndex: 'experience',
                    key: 'experience',
                },
                {
                    title: '状态',
                    dataIndex: 'statues',
                    key: 'statues',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render: (text, record, dataIndex) => (
                        <Switch checkedChildren='true' unCheckedChildren="false" defaultChecked={text} onChange={() => { this.onChange(text,record._id) }} key={index} />
                    ),
                },
            ]
        }
    }
    onChange(value,id) {
        var flag=''
        if (value === true) {
            flag=false
        } else {
            flag=true
        }
      
        //修改数据库中的预约状态
        let payload={
            flag,
            id
        }
        new Promise((resolve,reject)=>{
            this.props.dispatch({
                type:"service/updateStatues",
                resolve,
                reject,
                payload,
            })
        }).then((res)=>{
            console.log(res.data.data.ok,123)
            if(res.data.data.ok===1){
                message.success(res.data.info,onClose);
            }
            this.initweblist();
        })
       
    }
    onClose(){
        console.log(12)
    }
    render() {
        return (
            <div>
                <Table rowKey={(item) => item._id}
                    columns={this.state.columns} dataSource={this.state.list} />;
            </div>
        )
    }
    componentDidMount() {
       this.initweblist();
    }
    initweblist(){
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/serviceList",
                resolve,
                reject,
            })
        }).then((data) => {
            this.setState({
                list: data.data
            })
        })
    }
}
//映射的model里的
function mapStateToProps(state) {
    return {
        ...state
    }

}
export default connect(mapStateToProps)(index);