import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import UserBasicLeft from '../components/userBasicLeft';
import '../style/userInfo.scss';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserInfo extends Component {
  render() {
    return (
      <div className="userInfo clearAfter">
        <UserBasicLeft history={this.props.history} />
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default UserInfo;
