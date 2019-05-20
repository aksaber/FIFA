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
    const {history} = this.props;
    if (type === 0) {
      history.push(`/informations?id=${id}`);
    } else {
      history.push(`/match?id=${id}`);
    }
  };
  //跳转新手入门锚点
  gotoGuidance = () => {
    document.body.scrollTop -= 350;
    document.documentElement.scrollTop -= 350;
  };
  //跳转关于我们
  gotoAboutMe = () => {
    window.open('#/maintainableText', '_blank');
  };
  render() {
    const {home: {infoClassify, matchClassify, screenW}} = this.props;
    const grayColor = {
      color: '#9A9A9A'
    };
    return (
      <div className="footer">
        <div className="footer_top flex container">
          <div className="flex_1">
            <div onClick={this.gotoAboutMe}><p>关于我们</p></div>
            <div onClick={this.gotoGuidance}><p>新手入门</p></div>
          </div>
          <div className="flex_1">
            <p>FIFA资讯</p>
            {infoClassify.map(item => (<div
              onClick={() => this.gotoDetails(0, item.id)}
            >
              <p style={grayColor} className="ellipsis">{item.name}</p>
            </div>))}
          </div>
          <div className="flex_1">
            <p>电竞赛事</p>
            {matchClassify.map(item => (<div
              onClick={() => this.gotoDetails(1, item.id)}
            >
              <p style={grayColor} className="ellipsis">{item.name}</p>
            </div>))}
          </div>
          <div
            className={screenW < 768 ? 'moblieShareFooter' : 'flex_1'}
            style={{'text-align': 'right'}}
          >
            <img src={sina} width={20} height={16} style={{'margin-right': '30px'}} />
            <img src={wechat} width={20} height={16} style={{'margin-right': '30px'}} />
            <img src={qq} width={20} height={16} />
          </div>
        </div>
        <div className={screenW < 768 ? 'footer-bottom' : 'footer-bottom flex'}>
          <div className="flex_1">©2013-2019 17Fifa.com All Rights Reserved</div>
          <img
            src={logo}
            width={45}
            height={35}
            className={screenW < 768 ? 'moblieLogoFooter' : 'flex_1'}
            style={{'margin-top': '22px'}}
          />
          <div>京ICP备 13008509号 | 京公网安备11010602010169号</div>
        </div>
      </div>
    );
  }
}

export default Fifafooter;
