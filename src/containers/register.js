import React, {Component} from 'react';
import {Row, Col, Input, Button, Checkbox, message} from 'antd';
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
    axios.get('/auth/getCaptcha').then(res => {
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
    axios.get(`/member/sendSms?phone=${phone}`).then(res => {
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
    const {password, rePassword, isAllow} = this.state;
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
    }
    axios.post('/auth/register', {
      phone: this.state.phone,
      phoneCode: this.state.phoneCode,
      password: this.state.password,
      captachCode: this.state.code,
      captachToken: this.state.cToken,
      type: 2
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        message.success('注册成功');
        changeRoute('login');
        history.push('/login');
      } else {
        message.warning(data.msg);
        this.getCode();
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  render() {
    const {Password} = Input;
    const {
      phone,
      password,
      rePassword,
      phoneCode,
      code,
      imgSrc,
      cToken
    } = this.state;
    return (
      <div className="registerPage">
        <div className="registerModule">
          <div className="title">注册用户</div>
          <Row>
            <Col span={12}>
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
            <Col span={12}>
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
            <Checkbox onChange={this.allowCheckbox}>点击注册，即表示您同意接受我们的条款、数据使用政策和Cookie政策。</Checkbox>
            <br />
            <Button className="registerBtn" onClick={this.registerFun}>注册</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
