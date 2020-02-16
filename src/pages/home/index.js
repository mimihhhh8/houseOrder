import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
class index extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            list:[],
            // dataSource: [
            //     {
            //         key:0,
            //         username: "",
            //         loginid: "",
            //         phone: 0,
            //         sex: "",
            //         age: 0,
            //         detailaddress: ""
            //     },
            // ],
            columns: [
                {
                    title: '姓名',
                    dataIndex: 'username',
                    key: 'username',
                },
                {
                    title: '用户ID',
                    dataIndex: 'loginid',
                    key: 'loginid',
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '性别',
                    dataIndex: 'sex',
                    key: 'sex',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: '住址',
                    dataIndex: 'detailaddress',
                    key: 'detailaddress',
                },
            ]
        }
    }
    render() {
        return (
            <div>
                <Table rowKey={(item)=>item._id}
                    columns={this.state.columns} dataSource={this.state.list} />;
            </div>)
    }
    componentDidMount() {

        new Promise((resolve, reject) => {
            this.props.dispatch({
                //dispatch触发l一个action
                //user是命名空间（models中），login是user下面的方法
                type: "user/userInfoList",
                resolve,
                reject,
            })
        }).then((data) => {
            this.setState({
               list:data.data
            })
            
        })
    }
}


//映射
function mapStateToProps(state) {
    return {
        ...state
    }
}
export default connect(mapStateToProps)(index);
// connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
// mapStateToProps按字面意思：把models层state数据变为组件的props
// mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(我平常用几乎不写该方法)
// export default connect(mapStateToProps, mapDispatchToProps)(TestPage);