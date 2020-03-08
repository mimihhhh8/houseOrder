import React, { Component } from 'react'
import { Card, Form,Input,Button ,message, InputNumber} from 'antd';
import { Addserve } from './styled.js';
import {connect} from 'dva';
@Form.create()
 class Addinfo extends Component {
    constructor(props){
        super(props)
        this.state={
            workername:"",
            workeraddress:"",
            servicetype:"",
            task:"",
            statues:"false",
            experience:"",
            id:''
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Addserve>
                <Card title="添加员工信息" bordered={false} style={{ width: 400 }}>
                    {/* <Row>
                        <Col></Col>
                    </Row> */}
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                        <Form.Item label="员工姓名">
                            {
                            getFieldDecorator('workername', {
                                // rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({workername:e.target.value})}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="员工ID">
                            {
                            getFieldDecorator('id', {
                                // rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({id:e.target.value})}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="员工地址">
                            {
                            getFieldDecorator('workeraddress', {
                                rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({workeraddress:e.target.value})}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="服务类型">
                            {
                            getFieldDecorator('servicetype', {
                                rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({servicetype:e.target.value})}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="任务">
                            {
                            getFieldDecorator('task', {
                                rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({task:e.target.value})}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="工作年限">
                            {
                            getFieldDecorator('experience', {
                                rules: [{ message: 'Please input your note!' }],
                            })(<Input type="text" onChange={(e)=>{this.setState({experience:e.target.value})}}/>)
                            }
                        </Form.Item>
                    </Form>
                    <Button type="primary" className="center" onClick={()=>this.handleData()}>添加</Button>
                </Card>
            </Addserve>

        )
    }
    handleData(){
        let { workername,workeraddress,servicetype,task,statues,experience,id}=this.state;
        let payload={
            workername,
            workeraddress,
            servicetype,
            task,
            statues,
            experience,
            id
        }
        new Promise((resolve,reject)=>{
            this.props.dispatch({
                type:"service/serviceSave",
                resolve,
                reject,
                payload
            })
        }).then((data)=>{
            console.log(data)
            if(data.code===1){
                message.success("添加成功")
            }else{
                message.error("用户重复")
            }
           
        }) 
    }
}
//映射
function mapStateToProps(state){
    return {
        ...state
    }
}
export default connect(mapStateToProps)(Addinfo);
