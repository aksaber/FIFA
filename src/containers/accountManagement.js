import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  message,
  Button,
  Input
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class AccountManagement extends Component {
  render() {
    return (
      <div>
        <div className="title">账号管理</div>
        <div className="subTitle">您已绑定手机</div>
        <div className="clearAfter">
          <Input disabled value="157*****617" style={{marginRight: 20, width: 300}} />
          <Button className="userBtn">修改绑定手机</Button>
        </div>
        <div className="subTitle">密码修改</div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">旧密码</div>
          <Input style={{width: 400}} />
        </div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">新密码</div>
          <Input style={{width: 400}} />
        </div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">新密码确认</div>
          <Input style={{width: 400}} />
        </div>
        <Button type="primary" style={{marginTop: 50}}>保存</Button>
      </div>
    );
  }
}

export default AccountManagement;
