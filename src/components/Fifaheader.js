import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input} from 'antd';

import logo from '~/assets/img/logo.svg';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifaheader extends Component {
  gotoFIFA = () => {
    console.log(this.props);
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/informations');
    // this.props.history.push('/informations');
  };

  //搜索框输入
  searchInfo = () => {
    alert('搜索内容');
  };

  render() {
    return (
      <div className="fifaheader">
        <div className="leftheader">
          <img src={logo} width={45} height={34} style={{'margin-top': '-15px'}} />
          <ul>
            <li>首页</li>
            <div onClick={this.gotoFIFA}>
              <li>FIFA资讯</li>
            </div>
            <li>电竞赛事</li>
          </ul>
        </div>
        <div className="rightheader">
          <Input placeholder="搜索" onPressEnter={this.searchInfo} />
          <Avatar shape="circle" icon="user" />
        </div>
      </div>
    );
  }
}

export default Fifaheader;
