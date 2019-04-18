import React, {Component} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import '../style/forgetPsw.scss';
import axios from '../axios';

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

  //切换手机、邮箱登录
  toggleLogin = (type) => {
    type === 0 ? this.setState({loginWay: 0}) : this.setState({loginWay: 1});
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

  //忘记密码提交
  saveFun = () => {
    const {history, changeRoute} = this.props;
    const {
      loginWay,
      password,
      rePassword,
      email
    } = this.state;
    if (password.length < 6) {
      message.warning('密码长度不应小于6位');
      return false;
    }
    if (password !== rePassword) {
      message.warning('密码不一致');
      return false;
    }
    if (loginWay === 0) {
      //手机忘记密码
      axios.post('/member/phoneForgot', {
        phone: this.state.phone,
        phoneCode: this.state.phoneCode,
        password: this.state.password,
        captachCode: this.state.code,
        captachToken: this.state.cToken
      }).then(res => {
        const {data} = res;
        if (data.code === '0') {
          message.success('密码修改成功');
          changeRoute('login');
          history.push('/login');
        } else {
          message.warning(data.msg);
          this.getCode();
        }
      });
    } else {
      console.log(11);
      //邮箱忘记密码
      // axios.post(`/member/sendEmailFindPassword?email=${email}`)
      //   .then(res => {
      //
      //   })
    }
  };
  render() {
    const {Password} = Input;
    const {
      loginWay,
      phone,
      password,
      rePassword,
      phoneCode,
      code,
      imgSrc,
      cToken
    } = this.state;
    return (
      <div className="forgetPswPage">
        <div className="forgetPswModule">
          <div className="title">忘记密码</div>
          <div className="clearAfter" style={{width: 200, margin: '15px auto 10px'}}>
            <div className="left" onClick={() => this.toggleLogin(0)}>
              <li className={loginWay === 0 ? 'liStyle' : ''}>手机号码登录</li>
            </div>
            <div className="right" onClick={() => this.toggleLogin(1)}>
              <li className={loginWay === 1 ? 'liStyle' : ''}>邮箱登录</li>
            </div>
          </div>
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
          <div style={{textAlign: 'center', marginTop: 44}}>
            <Button style={{padding: '8px 109px', height: 'unset'}} onClick={this.saveFun}>提交</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPsw;
