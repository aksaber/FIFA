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
import MaskLayer from '../components/maskLayer';
import ModalUpdatePhone from '../components/modalUpdatePhone';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class AccountManagement extends Component {
  state = {
    oldPwd: '',
    newPwd: '',
    reNewPwd: ''
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //密码修改
  updateUserInfo = () => {
    const {oldPwd, newPwd, reNewPwd} = this.state;
    if (newPwd !== reNewPwd) {
      message.warning('新密码不一致');
      return false;
    }
    axios.post('/user/member/updatePassword', {
      oldPassword: oldPwd,
      password: newPwd
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('密码已修改');
        window.location.reload();
      } else {
        message.warning(data.msg);
      }
    });
  };

  render() {
    const {Password} = Input;
    const {home: {userInfo}} = this.props;
    const {oldPwd, newPwd, reNewPwd} = this.state;
    return (
      <div>
        <div className="title">账号管理</div>
        <div className="subTitle">您已绑定手机</div>
        <div className="clearAfter">
          <Input disabled value={userInfo.phone} style={{marginRight: 20, width: 300}} />
          <Button className="userBtn">修改绑定手机</Button>
        </div>
        <div className="subTitle">密码修改</div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">旧密码</div>
          <Password
            style={{width: 400}}
            value={oldPwd}
            name="oldPwd"
            onChange={this._changeValue}
          />
        </div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">新密码</div>
          <Password
            style={{width: 400}}
            value={newPwd}
            name="newPwd"
            onChange={this._changeValue}
          />
        </div>
        <div style={{marginBottom: 33}}>
          <div className="labelInput">新密码确认</div>
          <Password
            style={{width: 400}}
            value={reNewPwd}
            name="reNewPwd"
            onChange={this._changeValue}
          />
        </div>
        <Button type="primary" style={{marginTop: 50}} onClick={this.updateUserInfo}>保存</Button>
        <MaskLayer />
        <ModalUpdatePhone phone={userInfo.phone} />
      </div>
    );
  }
}

export default AccountManagement;
