import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="leftBanner">
          <img src={logo} height="70" />
        </div>
        <ul className="rightBanner">
          <li>首页</li>
          <li>FIFA资讯</li>
          <li>电竞赛事</li>
          <li>原生音乐</li>
        </ul>
      </div>
    );
  }
}

export default Banner;
