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
  constructor(props) {
    super(props);
    this.state = {
      hasSel: this.judgeSel(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasSel: this.judgeSel(nextProps)
    });
  }

  //判断当前选中哪个列表：用户信息or账号管理or消息中心
  judgeSel = (props) => {
    const {home: {currentRoute}} = props;
    if (currentRoute.indexOf('accountManagement') > -1) {
      return 1;
    } else if (currentRoute.indexOf('messageCenter') > -1) {
      return 2;
    }
    return 0;
  };

  toggleModule = (router, index) => {
    const {history, changeRoute} = this.props;
    changeRoute(router);
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
      default:
        break;
    }
  };

  render() {
    const {home: {userInfo: {name, headPortraitUrl}}} = this.props;
    const {hasSel} = this.state;
    return (
      <div className="userBasicLeft">
        <img
          src={headPortraitUrl}
          width={110}
          height={110}
          style={{borderRadius: '50%', marginTop: 69}}
        />
        <div style={{margin: '28px auto 55px', fontSize: 18}}>{name}</div>
        <div
          className={hasSel === 0 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('userInformation', 0)}
        >用户信息</div>
        <div
          className={hasSel === 1 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('accountManagement', 1)}
        >账号管理</div>
        <div
          className={hasSel === 2 ? 'userList selList' : 'userList'}
          onClick={() => this.toggleModule('messageCenter', 2)}
        >消息中心</div>
      </div>
    );
  }
}

export default UserBasicLeft;
