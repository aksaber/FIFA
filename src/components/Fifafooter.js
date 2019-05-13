import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '~/assets/img/logo.svg';
import sina from '~/assets/img/sina.svg';
import wechat from '~/assets/img/wechat.svg';
import qq from '~/assets/img/qq.svg';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifafooter extends Component {
  //跳转到fifa资讯或赛事
  gotoDetails = (type, id) => {
    //跳转到相应资讯/赛事列表
    const {history, changeRoute} = this.props;
    if (type === 0) {
      changeRoute('informations');
      history.push(`/informations?id=${id}`);
    } else {
      changeRoute('match');
      history.push(`/match?id=${id}`);
    }
  };
  render() {
    const {home: {infoClassify, matchClassify}} = this.props;
    const grayColor = {
      color: '#9A9A9A'
    };
    return (
      <div className="footer">
        <div className="footer_top flex container">
          <div className="flex_1">
            <p>关于我们</p>
            <p>新手入门</p>
          </div>
          <div className="flex_1">
            <p>FIFA资讯</p>
            {infoClassify.map(item => (<div
              onClick={() => this.gotoDetails(0, item.id)}
            >
              <p style={grayColor}>{item.name}</p>
            </div>))}
          </div>
          <div className="flex_1">
            <p>电竞赛事</p>
            {matchClassify.map(item => (<div
              onClick={() => this.gotoDetails(1, item.id)}
            >
              <p style={grayColor}>{item.name}</p>
            </div>))}
          </div>
          <div className="flex_1" style={{'text-align': 'right'}}>
            <img src={sina} width={20} height={16} style={{'margin-right': '30px'}} />
            <img src={wechat} width={20} height={16} style={{'margin-right': '30px'}} />
            <img src={qq} width={20} height={16} />
          </div>
        </div>
        <div className="footer-bottom flex">
          <div className="flex_1">©2013-2019 17Fifa.com All Rights Reserved</div>
          <img
            src={logo}
            width={45}
            height={35}
            className="flex_1"
            style={{'margin-top': '22px'}}
          />
          <div>京ICP备 13008509号 | 京公网安备11010602010169号</div>
        </div>
      </div>
    );
  }
}

export default Fifafooter;
