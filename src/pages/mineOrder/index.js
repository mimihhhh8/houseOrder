import React, { Component } from 'react'
import { connect } from 'dva';
import { Table,Button } from 'antd';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
             columns : [
                {
                    title: '订单类型',
                    dataIndex: 'servicetype',
                    key: 'servicetype',
                },
                {
                    title: '姓名',
                    dataIndex: 'workername',
                    key: 'workername',
                },
                {
                    title: '工龄',
                    dataIndex: 'experience',
                    key: 'experience',
                },
                {
                    title: '订单状态',
                    dataIndex: 'statues',
                    key: 'statues',
                    //render: (text, record, index) => {}
                    //参数分别为当前行的值，当前行数据，行索引
                    render:(text,record)=>{
                        return text===undefined?"":<Button>已预约</Button>
                     
                        }
                },
                {
                    title: '操作',
                    dataIndex: 'delete',
                    key: 'delete',
                    render:(text,record)=>{
                    return (
                        <div>
                            {
                                text===undefined?<Button onClick={() => this.cancleOrder(record._id)}>取消预约</Button>:""
                            }
                            
                        </div>
                    )
                    }
                },
            ]
        }
    }

    render() {
        return (
            <div>
                <Table rowKey={(record, index) => `complete${record.id}${index}`}
                    columns={this.state.columns} dataSource={this.state.list} />;



                    
            </div>
        )
    }
    componentDidMount() {
        this.getOrderDetail()
    }
    //获取订单详情
    getOrderDetail() {
        let userId=localStorage.getItem("usersid")
        let payload={
            userId
        }
       new Promise((resolve,reject)=>{
            this.props.dispatch({
                type:"service/mineOrderList",
                resolve,
                reject,
                payload
            })
       }).then((data)=>{
        this.setState({
            list:data.data.data.orderinfo
        })

       })
    }
    // 点击取消预约，将服务人员信息中的statues改为true
    cancleOrder(workerId){
        let flag=false
        let id=workerId
        let payload={
            flag,
            id,
            userId:localStorage.getItem("usersid")
        }
        new Promise((resolve,reject)=>{
            this.props.dispatch({
                type:"service/cancleOrder",
                resolve,
                reject,
                payload,
            })
        }).then((res)=>{
            this.getOrderDetail()
        })
    }
}
//映射的model里的
function mapStateToProps(state) {
    return {
       ...state
    }

}
export default connect(mapStateToProps)(index)