import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, Modal } from 'antd';
class index extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            list: [],
            visible: false,
            id:'',
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
                {
                    title: '操作',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, record) =>
                        (
                            <Button type="primary" danger="true" onClick={() => this.hanndleDelete(record)}>
                                删除
                            </Button>
                        )
                },
            ]
        }
    }
    render() {
        return (
            <div>
                <Table rowKey={(item) => item._id}
                    columns={this.state.columns} dataSource={this.state.list} />
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>你确定要删除该人员信息吗？</p>
                </Modal>
            </div>)
    }
    componentDidMount() {
        this.renderList()

    }
    renderList() {
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
                list: data.data
            })

        })
    }
    hanndleDelete(record) {
        this.setState({
            visible: true,
            id:record._id
        });

    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
        let id = this.state.id
        let payload = {
            id
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/deleteWorkerInfo",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {
            this.renderList()
        })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
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