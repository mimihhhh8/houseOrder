import React, { Component } from 'react'
import { connect } from 'dva';
import _ from "lodash"
import { Table, Switch, message, Input, Row, Col } from 'antd';
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
                        <Switch checkedChildren='true' unCheckedChildren="false" defaultChecked={text} onChange={() => { this.onChange(text, record._id, record) }} key={index} />
                    ),
                },
            ],
            searchValue:''
        }
    }
    onChange(value, id, record) {
        let userid = localStorage.getItem('usersid')
        var flag = ''
        if (value === true) {
            flag = false
        } else {
            flag = true
        }
        //修改数据库中的预约状态
        let payload = {
            flag,
            id,
            userid,
            record
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/updateStatues",
                resolve,
                reject,
                payload,
            })
        }).then((res) => {

            if (res.data.code === 200) {
                message.success(res.data.info);
            } else if (res.data.code === 200) {
                message.success(res.data.info);
            } else {
                message.error(res.data.info);
            }
            this.initweblist();
        })

    }
    render() {
        const { Search } = Input;
        const style = { padding: '8px 0' };
        return (
            <div>
                <div style={{ padding: '20px 0' }}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={6}>
                            <div style={style}>
                                <Search 
                                    placeholder="根据服务类型搜索" 
                                    onSearch={this.handleValue.bind(this)} 
                                    enterButton 
                                />
                            </div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div style={style}></div>
                        </Col>
                    </Row>
                </div>
                <Table rowKey={(item) => item._id}
                    columns={this.state.columns} dataSource={this.state.list} />;
            </div>
        )
    }
    componentDidMount() {
        this.initweblist();
    }
    initweblist(value) {
        let payload={
            searchValue:this.state.searchValue
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: "service/serviceList",
                resolve,
                reject,
                payload
            })
        }).then((data) => {
            let filterData = _.filter(data.data, e => e.statues === false)
            this.setState({
                list: filterData
            })
        })
    }
    // 获得搜索框内的值()
    handleValue(value){
        this.setState({
        searchValue:value
       },function(){
        this.initweblist();
       })
    //   
    }
}
//映射的model里的
function mapStateToProps(state) {
    return {
        ...state
    }

}
export default connect(mapStateToProps)(index);