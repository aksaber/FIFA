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
    const banner = {
      width: '100%',
      height: 70
    };
    const leftBanner = {
      float: 'left',
      width: 70
    };
    const rightBanner = {
      float: 'right'
    };
    return (
      <div style={banner}>
        <div style={leftBanner}>
          <img src={logo} height="70" />
        </div>
        <ul style={rightBanner}>
          <li>原生音乐</li>
          <li>电竞赛事</li>
          <li>FIFA资讯</li>
          <li>首页</li>
        </ul>
      </div>
    );
  }
}

export default Banner;
