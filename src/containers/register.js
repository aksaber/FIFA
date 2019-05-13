import React, {Component} from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Checkbox,
  message,
  Icon,
  Modal
} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import '../style/register.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginWay: 0,
      email: '',
      phone: '',
      password: '',
      rePassword: '',
      phoneCode: '',
      code: '',
      imgSrc: '',
      cToken: '',
      isAllow: false
    };
  }

  componentDidMount() {
    //获取图片验证码
    this.getCode();
  }

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
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

  //获取手机验证码
  getPhoneCode = () => {
    const {phone} = this.state;
    axios.get(`/user/member/sendPhoneRegister?phone=${phone}`).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('手机验证码已发送');
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //是否同意注册条款
  allowCheckbox = (e) => {
    this.setState({
      isAllow: e.target.checked
    });
  };

  //注册
  registerFun = () => {
    const {history, changeRoute} = this.props;
    const {
      password,
      rePassword,
      isAllow,
      loginWay
    } = this.state;
    if (password.length < 6) {
      message.warning('密码长度不应小于6位');
      return false;
    }
    if (password !== rePassword) {
      message.warning('密码不一致');
      return false;
    }
    if (!isAllow) {
      message.warning('请同意接受条款');
      return false;
    }
    axios.post('/user/auth/register', {
      email: loginWay === 0 ? null : this.state.email,
      phone: loginWay === 0 ? this.state.phone : null,
      phoneCode: loginWay === 0 ? this.state.phoneCode : null,
      password: this.state.password,
      captachCode: this.state.code,
      captachToken: this.state.cToken,
      type: loginWay === 0 ? 2 : 1
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        if (loginWay === 0) {
          message.success('注册成功');
        }
        changeRoute('login');
        history.push('/login');
      } else {
        message.warning(data.msg);
        this.getCode();
      }
    }).catch((err) => {
      message.error(`${err}`);
      this.getCode();
    });
  };

  //切换手机、邮箱注册
  toggleLogin = (type) => {
    type === 0 ? this.setState({loginWay: 0}) : this.setState({loginWay: 1});
  };

  //返回登录页
  goBack = () => {
    const {history, changeRoute} = this.props;
    changeRoute('login');
    history.push('/login');
  };

  //打开隐私声明
  gotoClause = () => {
    window.open('#/clause');
  };

  render() {
    const {Password} = Input;
    const {
      email,
      phone,
      password,
      rePassword,
      phoneCode,
      code,
      imgSrc,
      loginWay,
      cToken
    } = this.state;
    return (
      <div className="registerPage">
        <div className="registerModule">
          <div className="title">注册用户</div>
          <Icon type="swap-left" className="goBackLogin" onClick={this.goBack} />
          <div className="clearAfter" style={{width: 200, margin: '15px auto 10px'}}>
            <div className="left" onClick={() => this.toggleLogin(0)}>
              <li className={loginWay === 0 ? 'liStyle' : ''}>手机号码注册</li>
            </div>
            <div className="right" onClick={() => this.toggleLogin(1)}>
              <li className={loginWay === 1 ? 'liStyle' : ''}>邮箱注册</li>
            </div>
          </div>
          <Row>
            <Col span={12} style={{display: (loginWay === 0) ? 'none' : 'block'}}>
              <p>请输入注册邮箱</p>
              <Input
                value={email}
                onChange={this._changeValue}
                name="email"
              />
            </Col>
            <Col span={12} style={{display: (loginWay === 1) ? 'none' : 'block'}}>
              <Col span={24}>
                <Col span={16}>
                  <p>手机号码</p>
                  <Input
                    value={phone}
                    onChange={this._changeValue}
                    name="phone"
                    placeholder="您的手机号码"
                  />
                </Col>
                <Col span={8}>
                  <p>&nbsp;</p>
                  <Button
                    style={{float: 'right', fontSize: 10}}
                    onClick={this.getPhoneCode}
                  >发送验证码</Button>
                </Col>
              </Col>
            </Col>
            <Col span={12} style={{display: (loginWay === 1) ? 'none' : 'block'}}>
              <p>手机验证码</p>
              <Input
                value={phoneCode}
                onChange={this._changeValue}
                name="phoneCode"
              />
            </Col>
            <Col span={12}>
              <p>密码</p>
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
            <Col span={12}>
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
          <div className="registerFooter">
            <Checkbox onChange={this.allowCheckbox} />
            <span>点击注册，即表示您同意接受
              <a onClick={this.gotoClause}>我们的条款</a>
              、数据使用政策和Cookie政策。
            </span>
            <br />
            <Button className="registerBtn" onClick={this.registerFun}>注册</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
