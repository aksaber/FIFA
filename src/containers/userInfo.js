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
  // componentDidMount() {
  //   const {history} = this.props;
  //   history.push('/userInfo/userInformation');
  // }

  render() {
    const {home: {isFixed}} = this.props;
    return (
      <div className="userInfo clearAfter" style={{marginTop: isFixed ? 90 : 0}}>
        <UserBasicLeft history={this.props.history} />
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default UserInfo;
