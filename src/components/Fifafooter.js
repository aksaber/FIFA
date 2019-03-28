import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '~/assets/img/logo.svg';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifafooter extends Component {
  render() {
    const grayColor = {
      color: '#9A9A9A'
    };
    return (
      <div className="footer">
        <div className="footer_top flex">
          <div className="flex_1">
            <p>关于我们</p>
            <p>版权信息</p>
            <p>新手入门</p>
          </div>
          <div className="flex_1">
            <p>FIFA资讯</p>
            <p style={grayColor}>FIFA</p>
            <p style={grayColor}>FIFA Online</p>
            <p style={grayColor}>实况足球</p>
            <p style={grayColor}>Football Manager</p>
          </div>
          <div className="flex_1">
            <p>电竞赛事</p>
            <p style={grayColor}>FUT Champions</p>
            <p style={grayColor}>FIWC 电子足球世界杯</p>
            <p style={grayColor}>ESWC</p>
            <p style={grayColor}>非凡赛事</p>
          </div>
        </div>
        <div className="footer-bottom flex">
          <div className="flex_1">© 2019 all rights reserved</div>
          <img src={logo} width={45} height={35} className="flex_1" style={{'margin-top': '-5px'}} />
          <div>沪ICP备14031707 | 广播电视节目制作经营许可证（泸）字第2467号</div>
        </div>
      </div>
    );
  }
}

export default Fifafooter;
