import React, {Component} from 'react';
import {Avatar} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import '../style/components/userBasicTop.scss';

const outLogin = {
  position: 'absolute',
  right: 10,
  top: 10,
  fontSize: 11
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserBasicTop extends Component {
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
    const {history} = this.props;
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

  gotoLogin = () => {
    const {history} = this.props;
    if (document.cookie) {
      const cookieArr = document.cookie.split(';');
      for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].split('=')[0].trim() === 'fifaToken') {
          document.cookie = `fifaToken=;expires=${(new Date(0)).toGMTString()}`;
        }
      }
    }
    history.push('/login');
  };

  render() {
    const {home: {userInfo}} = this.props;
    const {hasSel} = this.state;
    return (
      <div className="userBasicTop" style={{position: 'relative'}}>
        <span style={outLogin} onClick={this.gotoLogin}>退出登录</span>
        {userInfo.headPortraitUrl ? <img src={userInfo.headPortraitUrl} width={90} height={90} />
          : <Avatar
            shape="circle"
            icon="user"
            className="avator_user"
            style={{
              marginTop: 30,
              fontSize: 93,
              width: 110,
              height: 110
            }}
          />}
        <div className="userName">{userInfo.name}</div>
        <div>
          <div
            className={hasSel === 0 ? 'userBasicTag selected' : 'userBasicTag'}
            onClick={() => this.toggleModule('userInformation', 0)}
          >用户信息</div>
          <div
            className={hasSel === 1 ? 'userBasicTag selected' : 'userBasicTag'}
            onClick={() => this.toggleModule('accountManagement', 1)}
          >账号管理</div>
          <div
            className={hasSel === 2 ? 'userBasicTag selected' : 'userBasicTag'}
            onClick={() => this.toggleModule('messageCenter', 2)}
          >消息中心</div>
        </div>
      </div>
    );
  }
}

export default UserBasicTop;
