import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import '../style/components/userBasicLeft.scss';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserBasicLeft extends Component {
  state = {
    hasSel: 0
  };

  toggleModule = (router, index) => {
    const {history, changeRoute} = this.props;
    changeRoute('userInfo');
    this.setState({hasSel: index});
    switch (router) {
      case 'userInformation':
        history.push('/userInfo/userInformation');
        break;
      case 'accountManagement':
        history.push('/userInfo/accountManagement');
        break;
      case 'messageCenter':
        history.push('/userInfo/messageCenter');
        break;
      case 'reviews':
        history.push('/userInfo/reviews');
        break;
      default:
        break;
    }
  };

  render() {
    const {hasSel} = this.state;
    return (
      <div className="userBasicLeft">
        <img src="" width={110} height={110} style={{borderRadius: '50%', marginTop: 69}} />
        <div style={{margin: '28px auto 55px', fontSize: 18}}>老脑</div>
        <div
          className={hasSel === 0 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('userInformation', 0)}
        >用户信息</div>
        <div
          className={hasSel === 1 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('accountManagement', 1)}
        >账号管理</div>
        <div className="centerLine" />
        <div
          className={hasSel === 2 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('messageCenter', 2)}
        >消息中心</div>
        <div
          className={hasSel === 3 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('reviews', 3)}
        >评论管理</div>
      </div>
    );
  }
}

export default UserBasicLeft;
