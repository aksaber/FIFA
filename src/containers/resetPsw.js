import React, {Component} from 'react';
import {Row, Col, Input, Button, message, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import '../style/forgetPsw.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class ResetPsw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      password: '',
      rePassword: '',
    };
  }

  componentDidMount() {}

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //返回登录页
  goBack = () => {
    const {history, changeRoute} = this.props;
    changeRoute('login');
    history.push('/login');
  };

  formatSearch = (url) => {
    if (typeof url !== 'undefined') {
      url = url.substr(1);
      //把字符串分割为字符串数组
      const arr = url.split('&');
      let obj = {};
      const objAssign = {};
      let newarr = [];
      arr.forEach((item) => {
        newarr = item.split('=');
        obj = {[newarr[0]]: newarr[1]};
        Object.assign(objAssign, obj);
      });
      return objAssign;
    }
  };

  //重置密码提交
  saveFun = () => {
    const {history, changeRoute} = this.props;
    const {urlParams, password, rePassword} = this.state;
    //若超时则提示超时并返回登录页
    if (urlParams.outTime < new Date().getTime()) {
      message.warning('重置密码已超时请重新操作');
      return false;
    }
    //二次密码不一致
    if (password !== rePassword) {
      message.warning('新密码不一致');
      return false;
    }
    axios.post(`/user/member/emailForgot?password=${password}&userId=${urlParams.code}`)
      .then(res => {
        if (res.data.code === '0') {
          message.success('密码已重置');
          changeRoute('login');
          history.push('/login');
        } else {
          message.warning(res.data.msg);
        }
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  };

  render() {
    const {Password} = Input;
    const {password, rePassword} = this.state;
    return (
      <div className="forgetPswPage">
        <div className="forgetPswModule">
          <div className="title">重置密码</div>
          <Icon type="swap-left" className="goBackLogin" onClick={this.goBack} />
          <Row>
            <Col span={12}>
              <p>新密码</p>
              <Password
                value={password}
                onChange={this._changeValue}
                name="password"
                placeholder="您的密码"
              />
            </Col>
            <Col span={12}>
              <p>确认密码</p>
              <Password
                value={rePassword}
                onChange={this._changeValue}
                name="rePassword"
              />
            </Col>
          </Row>
          <div style={{textAlign: 'center', marginTop: 44}}>
            <Button
              style={{padding: '8px 109px', height: 'unset'}}
              onClick={this.saveFun}
            >提交</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPsw;
