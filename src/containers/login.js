import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import logo from '../assets/img/logo.svg';
import '../style/login.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginWay: 0
    };
  }

  //切换手机、邮箱登录
  toggleLogin = (type) => {
    type === 0 ? this.setState({loginWay: 0}) : this.setState({loginWay: 1});
  };

  render() {
    const {Password} = Input;
    const {loginWay} = this.state;
    return (
      <div className="loginPage">
        <div className="loginModule">
          <div className="titleBox">
            <img src={logo} width={62} height={55} style={{marginBottom: 10}} />
            <div style={{marginBottom: 20, fontSize: 23}}>
              <div>非凡网</div>
              <div>专业FIFA游戏资讯站</div>
            </div>
            <div className="subTitle">
              <p>中国最好的FIFA游戏资讯站</p>
              <p>China’s Beast FIFA Game Information</p>
            </div>
            <div style={{
              background: '#ff0099',
              borderRadius: 5,
              width: '100%',
              height: 100
            }}
            />
          </div>
          <div className="loginFrame">
            <div className="title">用户登录</div>
            <ul className="flex">
              <div className="flex_1" onClick={() => this.toggleLogin(0)}>
                <li className={loginWay === 0 ? 'liStyle' : ''}>手机号码登录</li>
              </div>
              <div className="flex_1" onClick={() => this.toggleLogin(1)}>
                <li className={loginWay === 1 ? 'liStyle' : ''}>邮箱登录</li>
              </div>
            </ul>
            <Row>
              <Col span={24}>
                <p>手机号码</p>
                <Input placeholder={loginWay === 0 ? '您的手机号码' : '您的邮箱号码'} />
              </Col>
              <Col span={24}>
                <p>密码</p>
                <Password placeholder="您的密码" />
              </Col>
              <Col span={12}>
                <p>验证码</p>
                <Input placeholder="验证码" />
              </Col>
              <Col span={12} style={{background: '#fff'}} />
              <Col span={24}>
                <Button>登录</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
