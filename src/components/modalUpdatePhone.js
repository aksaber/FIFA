import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  message,
  Button,
  Input,
  Row,
  Col,
} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import '../style/components/modal.scss';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class ModalUpdatePhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.home.userInfo.phone ? 1 : 2,
      phone: '',
      phoneCode: '',
      newPhoneCode: '',
      count: 60,
      liked: true,
      count2: 60,
      liked2: true
    };
  }

  //手机验证码
  getPhoneCode = () => {
    if (this.state.type === 1) {
      if (!this.state.liked) {
        return false;
      }
      //旧手机验证码
      axios.get('/user/member/bindPhoneFirst').then(res => {
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
        }
      }).catch((err) => {
        message.error(`${err}`);
      });
    } else {
      if (!this.state.liked2) {
        return false;
      }
      //新手机验证码
      axios.get(`/user/member/sendSms?phone=${this.state.phone}`).then(res => {
        const {data} = res;
        if (data.code === '0') {
          message.success('手机验证码已发送');
          //设置定时器：60秒倒计时重新发送验证码
          const timer = setInterval(() => {
            this.setState({
              count2: --this.state.count2,
              liked2: false
            }, () => {
              if (this.state.count2 === 0) {
                clearInterval(timer);
                this.setState({
                  liked2: true,
                  count2: 60
                });
              }
            });
          }, 1000);
        } else {
          message.warning(data.msg);
        }
      }).catch((err) => {
        message.error(`${err}`);
      });
    }
  };

  //提交手机验证码
  savePhoneCode = () => {
    if (this.state.type === 1) {
      //提交旧手机验证码
      axios.get(`/user/member/bindPhoneSecond?code=${this.state.phoneCode}`)
        .then(res => {
          const {data} = res;
          if (data.code === '0') {
            //切换第二步：绑定新手机
            this.setState({type: 2});
          } else {
            message.warning(data.msg);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
        });
    } else {
      const {phone, newPhoneCode} = this.state;
      //提交新手机和验证码
      axios.get(`/user/member/bindPhoneThird?code=${newPhoneCode}&phone=${phone}`)
        .then(res => {
          const {data} = res;
          if (data.code === '0') {
            message.success('已成功绑定新手机');
            this.setState({
              type: 1,
              phone: '',
              phoneCode: '',
              newPhoneCode: ''
            }, () => {
              this.props.hide();
            });
          } else {
            message.warning(data.msg);
          }
        })
        .catch((err) => {
          message.error(`${err}`);
        });
    }
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  render() {
    const {
      type,
      phoneCode,
      phone,
      newPhoneCode,
      liked,
      liked2,
      count,
      count2
    } = this.state;
    return (
      <div className="modalFrame">
        <div className="title">{type === 1 ? '修改绑定手机' : '绑定新手机'}</div>
        <Row>
          <Col span={24} style={{display: type === 1 ? 'block' : 'none'}}>
            <p>旧手机号码</p>
            <Input
              value={this.props.phone}
              disabled
            />
          </Col>
          <Col span={24} style={{display: type === 2 ? 'block' : 'none'}}>
            <p>新手机号码</p>
            <Input
              value={phone}
              onChange={this._changeValue}
              name="phone"
            />
          </Col>
          <Col span={liked ? 16 : 14} style={{display: type === 1 ? 'block' : 'none'}}>
            <p>手机验证码</p>
            <Input
              value={phoneCode}
              onChange={this._changeValue}
              name="phoneCode"
            />
          </Col>
          <Col span={liked2 ? 16 : 14} style={{display: type === 2 ? 'block' : 'none'}}>
            <p>手机验证码</p>
            <Input
              value={newPhoneCode}
              onChange={this._changeValue}
              name="newPhoneCode"
            />
          </Col>
          <Col span={liked ? 8 : 10} style={{display: type === 1 ? 'block' : 'none'}}>
            <p>&nbsp;</p>
            <Button
              style={{float: 'right', fontSize: 10}}
              onClick={this.getPhoneCode}
            >{liked ? <span>发送验证码</span> : <span>{`${count}s后重新发送`}</span>}</Button>
          </Col>
          <Col span={liked2 ? 8 : 10} style={{display: type === 2 ? 'block' : 'none'}}>
            <p>&nbsp;</p>
            <Button
              style={{float: 'right', fontSize: 10}}
              onClick={this.getPhoneCode}
            >{liked2 ? <span>发送验证码</span> : <span>{`${count2}s后重新发送`}</span>}</Button>
          </Col>
          <Col span={24}>
            <Button style={{marginTop: 49}} onClick={this.savePhoneCode}>提交</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModalUpdatePhone;
