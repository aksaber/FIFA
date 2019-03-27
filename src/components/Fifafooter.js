import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifafooter extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <div>
            <div>关于我们</div>
            <div>版权信息</div>
            <div>新手入门</div>
          </div>
          <div>
            <div>FIFA资讯</div>
            <div>FIFA</div>
            <div>FIFA Online</div>
            <div>实况足球</div>
            <div>Football Manager</div>
          </div>
          <div>
            <div>电竞赛事</div>
            <div>FUT Champions</div>
            <div>FIWC 电子足球世界杯</div>
            <div>ESWC</div>
            <div>非凡赛事</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Fifafooter;
