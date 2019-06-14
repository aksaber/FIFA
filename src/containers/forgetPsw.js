import React, {Component} from 'react';
import {Row, Col, Input, Button, message, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import '../style/forgetPsw.scss';
import axios from '../axios';
import logo from '../assets/img/logo.svg';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class ForgetPsw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginWay: 0,
      phone: '',
      email: '',
      password: '',
      rePassword: '',
      phoneCode: '',
      code: '',
      imgSrc: '',
      cToken: '',
      count: 60,
      liked: true
    };
  }

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('forgetPsw');
    //获取图片验证码
    this.getCode();
  }

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //获取手机验证码
  getPhoneCode = () => {
    const {phone} = this.state;
    if (phone === '') {
      message.warning('请输入手机号');
      return false;
    }
    if (phone.length !== 11) {
      message.warning('请输入正确的手机号');
      return false;
    }
    if (!this.state.liked) {
      return false;
    }
    this.setState({liked: false});
    axios.get(`/user/member/sendPhoneCodeFindPassword?phone=${phone}`).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('手机验证码已发送');
        //设置定时器：60秒倒计时重新发送验证码
        const timer = setInterval(() => {
          this.setState({
            count: --this.state.count,
            liked: false
          }, () => {
            if (this.state.count === 0) {
              clearInterval(timer);
              this.setState({
                liked: true,
                count: 60
              });
            }
          });
        }, 1000);
      } else {
        message.warning(data.msg);
        this.setState({liked: true});
      }
    }).catch((err) => {
      message.error(`${err}`);
      this.setState({liked: true});
    });
  };

  //切换手机、邮箱登录
  toggleLogin = (type) => {
    type === 0 ? this.setState({loginWay: 0}) : this.setState({loginWay: 1});
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

  //忘记密码提交
  saveFun = () => {
    const {history} = this.props;
    const {
      email,
      loginWay,
      password,
      rePassword
    } = this.state;
    const emailReg = /@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (loginWay !== 0 && !emailReg.test(email)) {
      message.warning('请输入正确的邮箱');
      return false;
    }
    if (loginWay === 0) {
      //手机忘记密码
      if (password.length < 6) {
        message.warning('密码长度不应小于6位');
        return false;
      }
      if (password !== rePassword) {
        message.warning('密码不一致');
        return false;
      }
      axios.post('/user/member/phoneForgot', {
        phone: this.state.phone,
        phoneCode: this.state.phoneCode,
        password: this.state.password,
        captachCode: this.state.code,
        captachToken: this.state.cToken
      }).then(res => {
        const {data} = res;
        if (data.code === '0') {
          message.success('密码修改成功');
          history.push('/login');
        } else {
          message.warning(data.msg);
          this.getCode();
        }
      });
    } else {
      //邮箱忘记密码
      axios.post('/user/member/sendEmailFindPassword', {
        email: this.state.email,
        captachCode: this.state.code,
        captachToken: this.state.cToken
      })
        .then(res => {
          const {data} = res;
          if (data.code === '0') {
            message.success('请打开邮箱查看');
          } else {
            message.warning(data.msg);
            this.getCode();
          }
        });
    }
  };

  //返回登录页
  goBack = () => {
    const {history} = this.props;
    history.push('/login');
  };
  render() {
    const {Password} = Input;
    const {
      loginWay,
      phone,
      email,
      password,
      rePassword,
      phoneCode,
      code,
      imgSrc,
      liked,
      count,
      cToken
    } = this.state;
    const {home: {screenW}} = this.props;
    return (
      <div className="forgetPswPage">
        <div className="forgetPswModule">
          <div className="title">
            {screenW < 768 ? <img src={logo} width={58} height={45} /> : <span>忘记密码</span>}
          </div>
          <Icon type="swap-left" className="goBackLogin" onClick={this.goBack} />
          <div className="clearAfter" style={{width: 200, margin: '15px auto 10px'}}>
            <div className="left" onClick={() => this.toggleLogin(0)}>
              <li className={loginWay === 0 ? 'liStyle' : ''}>通过手机找回</li>
            </div>
            <div className="right" onClick={() => this.toggleLogin(1)}>
              <li className={loginWay === 1 ? 'liStyle' : ''}>通过邮箱找回</li>
            </div>
          </div>
          <Row>
            <Col
              className="clearAfter"
              md={24}
              xl={12}
              style={{display: (loginWay === 1) ? 'none' : 'block'}}
            >
              <Col span={24}>
                <Col span={liked ? 16 : 14}>
                  <p>手机号码</p>
                  <Input
                    value={phone}
                    onChange={this._changeValue}
                    name="phone"
                    placeholder="您的手机号码"
                  />
                </Col>
                <Col span={liked ? 8 : 10}>
                  <p>&nbsp;</p>
                  <Button
                    style={{float: 'right', fontSize: 10, width: 'unset'}}
                    onClick={this.getPhoneCode}
                  >{liked ? <span>发送验证码</span> : <span>{`${count}s后重新发送`}</span>}</Button>
                </Col>
              </Col>
            </Col>
            <Col md={24} xl={12} style={{display: (loginWay === 1) ? 'none' : 'block'}}>
              <p>手机验证码</p>
              <Input
                value={phoneCode}
                onChange={this._changeValue}
                name="phoneCode"
              />
            </Col>
            <Col md={24} xl={12} style={{display: (loginWay === 1) ? 'none' : 'block'}}>
              <p>新密码</p>
              <Password
                value={password}
                onChange={this._changeValue}
                name="password"
                placeholder="您的新密码"
              />
            </Col>
            <Col md={24} xl={12} style={{display: (loginWay === 1) ? 'none' : 'block'}}>
              <p>确认新密码</p>
              <Password
                value={rePassword}
                onChange={this._changeValue}
                name="rePassword"
              />
            </Col>
            <Col md={24} xl={12} style={{display: (loginWay === 0) ? 'none' : 'block'}}>
              <p>请输入注册邮箱</p>
              <Input
                value={email}
                onChange={this._changeValue}
                name="email"
              />
            </Col>
            <Col md={24} xl={12}>
              <Col span={12}>
                <p>验证码</p>
                <Input
                  value={code}
                  onChange={this._changeValue}
                  name="code"
                />
              </Col>
              <Col span={12}>
                <p>&nbsp;</p>
                <div onClick={this.getCode}>
                  <img
                    src={imgSrc}
                    style={{
                      height: 32,
                      float: 'right',
                      borderRadius: 5,
                      cursor: 'pointer'
                    }}
                  />
                </div>
              </Col>
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

export default ForgetPsw;
