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
      phoneCode: '',
    };
  }

  //旧手机验证码
  getPhoneCode = () => {
    axios.get('/user/member/bindPhoneFirst').then(res => {
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

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  render() {
    const {phoneCode} = this.state;
    return (
      <div className="modalFrame">
        <div className="title">修改绑定手机</div>
        <Row>
          <Col span={24}>
            <p>旧手机号码</p>
            <Input
              value={this.props.phone}
              disabled
            />
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
            <p>&nbsp;</p>
            <Button
              style={{float: 'right', fontSize: 10}}
              onClick={this.getPhoneCode}
            >发送验证码</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ModalUpdatePhone;
