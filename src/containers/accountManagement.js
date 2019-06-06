import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  message,
  Button,
  Input,
  Col
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
    reNewPwd: '',
    unbindOld: false
  };

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('accountManagement');
  }

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

  //点击遮罩层时隐藏模态框
  hideUnBindOld = () => {
    this.setState({unbindOld: false});
  };

  render() {
    const {Password} = Input;
    const {home: {userInfo, screenW}} = this.props;
    const {
      oldPwd,
      newPwd,
      reNewPwd,
      unbindOld
    } = this.state;
    return (
      <div>
        <div className="title">账号管理</div>
        <div className="subTitle">您已绑定手机</div>
        <div className="clearAfter">
          <Col span={10} style={{marginRight: screenW < 768 ? '' : 20}}>
            <Input
              disabled
              value={userInfo.phone}
              style={{width: screenW < 768 ? '100%' : '', maxWidth: 300}}
            />
          </Col>
          <Col span={screenW < 768 ? 14 : 8}>
            <Button
              className="userBtn"
              style={{float: screenW < 768 ? 'right' : 'left'}}
              onClick={() => { this.setState({unbindOld: true}); }}
            >修改绑定手机</Button>
          </Col>
        </div>
        <div className="subTitle">密码修改</div>
        <div style={{marginBottom: 33}} className="clearAfters">
          <Col span={6}>
            <div className="labelInput">旧密码</div>
          </Col>
          <Col span={18}>
            <Password
              style={{width: screenW < 768 ? '100%' : 400}}
              value={oldPwd}
              name="oldPwd"
              onChange={this._changeValue}
            />
          </Col>
        </div>
        <div style={{marginBottom: 33}} className="clearAfters">
          <Col span={6}>
            <div className="labelInput">新密码</div>
          </Col>
          <Col span={18}>
            <Password
              style={{width: screenW < 768 ? '100%' : 400}}
              value={newPwd}
              name="newPwd"
              onChange={this._changeValue}
            />
          </Col>
        </div>
        <div style={{marginBottom: 33}} className="clearAfters">
          <Col span={6}>
            <div className="labelInput">新密码确认</div>
          </Col>
          <Col span={18}>
            <Password
              style={{width: screenW < 768 ? '100%' : 400}}
              value={reNewPwd}
              name="reNewPwd"
              onChange={this._changeValue}
            />
          </Col>
        </div>
        <Button
          type="primary"
          style={{marginTop: 50, width: screenW < 768 ? '100%' : ''}}
          onClick={this.updateUserInfo}
        >保存</Button>
        {unbindOld ? <div>
          <MaskLayer onClick={this.hideUnBindOld} />
          <ModalUpdatePhone
            phone={userInfo.phone}
            hide={this.hideUnBindOld}
          /></div> : ''}
      </div>
    );
  }
}

export default AccountManagement;
