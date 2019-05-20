import React, {Component} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
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
      loginWay: 0,
      phone: '',
      email: '',
      password: '',
      code: '',
      imgSrc: '',
      cToken: '',
      adLogin: {}
    };
  }

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('login');
    //获取图片验证码
    this.getCode();
    //登录页广告图
    axios.get('/news/news/firstNews').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({adLogin: data.data.adLogin});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  //切换手机、邮箱登录
  toggleLogin = (type) => {
    type === 0 ? this.setState({loginWay: 0}) : this.setState({loginWay: 1});
  };

  //注册账号
  gotoRoute = (route) => {
    const {history} = this.props;
    history.push(`/${route}`);
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //登录
  loginFun = () => {
    const {history, saveToken} = this.props;
    axios.post('/user/auth/login', {
      phone: this.state.phone,
      email: this.state.email,
      password: this.state.password,
      captachCode: this.state.code,
      captachToken: this.state.cToken,
      type: this.state.loginWay === 0 ? 2 : 1
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('登录成功');
        document.cookie = `fifaToken=${data.data}`;
        //将token存入redux
        saveToken(data.data);
        history.push('/home');
      } else {
        message.warning(data.msg);
        this.getCode();
      }
    }).catch((err) => {
      message.error(`${err}`);
      this.getCode();
    });
  };

  //获取图片验证码
  getCode = () => {
    axios.get('/user/auth/getCaptcha').then(res => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          imgSrc: data.data.image,
          cToken: data.data.cToken
        });
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //跳转首页
  gotoLogin = () => {
    const {history} = this.props;
    history.push('/home');
  };

  render() {
    const {Password} = Input;
    const {
      loginWay,
      phone,
      email,
      password,
      code,
      imgSrc,
      cToken,
      adLogin
    } = this.state;
    return (
      <div className="loginPage">
        <div className="loginModule">
          <div className="titleBox">
            <div onClick={this.gotoLogin}>
              <img
                src={logo}
                width={62}
                height={55}
                style={{marginBottom: 10, cursor: 'pointer'}}
              />
            </div>
            <div style={{marginBottom: 20, fontSize: 23}}>
              <div>非凡网</div>
              <div>专业FIFA游戏资讯站</div>
            </div>
            <div className="subTitle">
              <p>中国最好的FIFA游戏资讯站</p>
              <p>China Best FIFA Game Information Station.</p>
            </div>
            <div
              style={{textAlign: 'center'}}
              onClick={() => { window.open(adLogin.jumpUrl); }}
            >
              <img
                src={adLogin.pictureUrl}
                width={260}
                height={100}
                style={{borderRadius: 5, cursor: 'pointer'}}
              />
            </div>
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
              <Col span={24} style={{display: (loginWay === 0) ? 'block' : 'none'}}>
                <p>手机号码</p>
                <Input
                  value={phone}
                  onChange={this._changeValue}
                  name="phone"
                  placeholder="您的手机号码"
                />
              </Col>
              <Col span={24} style={{display: (loginWay === 1) ? 'block' : 'none'}}>
                <p>邮箱</p>
                <Input
                  value={email}
                  onChange={this._changeValue}
                  name="email"
                  placeholder="您的邮箱号码"
                />
              </Col>
              <Col span={24}>
                <p>密码</p>
                <Password
                  value={password}
                  onChange={this._changeValue}
                  name="password"
                  placeholder="您的密码"
                />
              </Col>
              <Col span={12}>
                <p>验证码</p>
                <Input
                  value={code}
                  onChange={this._changeValue}
                  name="code"
                  placeholder="验证码"
                />
              </Col>
              <Col span={12}>
                <p>&nbsp;</p>
                <div onClick={this.getCode}>
                  <img
                    src={imgSrc}
                    style={{
                      width: 115,
                      height: 32,
                      float: 'right',
                      borderRadius: 5,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </Col>
              <Col span={24}>
                <Button onClick={this.loginFun}>登录</Button>
              </Col>
            </Row>
            <div style={{marginTop: 10}}>
              <span
                style={{cursor: 'pointer'}}
                onClick={() => this.gotoRoute('forgetPsw')}
              >忘记密码</span>
              <span
                style={{float: 'right', cursor: 'pointer'}}
                onClick={() => this.gotoRoute('register')}
              >注册账号</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
