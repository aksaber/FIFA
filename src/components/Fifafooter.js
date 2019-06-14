import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'antd';
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
  constructor(props) {
    super(props);
    this.state = {
      isWechats: false,
      isQQ: false
    };
  }

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
    const {history} = this.props;
    if (window.location.hash.indexOf('#/home?guidance') > -1) {
      document.getElementById('guidance').scrollIntoView();
    }
    history.push('/home?guidance');
  };
  //跳转关于我们
  gotoAboutMe = () => {
    window.open('#/maintainableText', '_blank');
  };
  //加入QQ群
  joinQQ = (type) => {
    if (type === 1) {
      window.open('https://shang.qq.com/wpa/qunwpa?idkey=0c5bb4e41dae5a5e0bc27fbd32c04cdd10af243d413782fbdaecd75c44750abb');
    } else if (type === 2) {
      window.open('https://shang.qq.com/wpa/qunwpa?idkey=a8b938de3fcea1e5b53e8ccc0425ac8f9a9cf6762be36f116a061d80431a47e4');
    }
  };
  render() {
    const {home: {infoClassify, matchClassify, screenW}} = this.props;
    const {isWechats, isQQ} = this.state;
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
            <span
              onClick={() => { window.open('https://weibo.com/easportsfifa'); }}
              style={{cursor: 'pointer', marginRight: 30}}
            >
              <img src={sina} width={20} height={16} />
            </span>
            <span
              style={{cursor: 'pointer', marginRight: 30, position: 'relative'}}
              onMouseEnter={() => { this.setState({isWechats: true}); }}
              onMouseLeave={() => { this.setState({isWechats: false}); }}
            >
              <img src={wechat} width={20} height={16} />
              <img
                src="https://17fifa.com/wp-content/uploads/2016/05/qrcode_for_gh_e4e915d9d5bc_258.jpg"
                style={{
                  display: isWechats ? 'block' : 'none',
                  position: 'absolute',
                  top: 27,
                  left: 0,
                  zIndex: 99
                }}
              />
            </span>
            <span
              onMouseEnter={() => { this.setState({isQQ: true}); }}
              onMouseLeave={() => { this.setState({isQQ: false}); }}
              style={{position: 'relative'}}
            >
              <img src={qq} width={20} height={16} />
              <ul style={{display: isQQ ? 'block' : 'none'}} className="qqGroup">
                <span onClick={() => this.joinQQ(1)}>
                  <li><Icon type="qq" /> 非凡网FIFA交流群1</li>
                </span>
                <span onClick={() => this.joinQQ(2)}>
                  <li><Icon type="qq" /> 非凡网FIFA交流群2</li>
                </span>
              </ul>
            </span>
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
