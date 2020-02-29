import React, { Component } from 'react'
import { connect } from 'dva';
class index extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        let{userOrderInfo}=this.props;
        console.log(userOrderInfo)
        return (
            <div>
                我的订单
            </div>
        )
    }
    //获取用户
}
//映射的model里的
function mapStateToProps(state) {
    // 将state中的数据映射到props中，所以在使用userOrderInfo的时候需要解构
    const {userOrderInfo}=state.service
    return {
        userOrderInfo
    }

}
export default connect(mapStateToProps)(index)