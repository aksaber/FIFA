import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input, Carousel} from 'antd';

import logo from '~/assets/img/logo.svg';
import ChildList from '../components/childList';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifaheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: 'FIFA',
          url: ''
        },
        {
          name: 'FIFA Online',
          url: ''
        },
        {
          name: 'PESLEAGUE',
          url: ''
        },
        {
          name: 'FOOTBALL MANAGER',
          url: ''
        },
        {
          name: 'FOOTBALL MANAGER',
          url: ''
        }
      ],
      isShow: false,
    };
  }

  gotoFIFA = () => {
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/informations');
    // this.props.history.push('/informations');
  };

  gotoMatch = () => {
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/match');
  };

  //搜索框输入
  searchInfo = () => {
    console.log('搜索内容');
  };

  //鼠标hover出现子资讯列表
  showChildList = () => {
    this.setState({
      isShow: true
    });
  };

  //鼠标移出
  hideChildList = () => {
    this.setState({
      isShow: false
    });
  };

  render() {
    const {list, isShow} = this.state;
    return (
      <div className="header">
        <div className="fifaheader">
          <div className="leftheader">
            <img src={logo} width={45} height={34} style={{'margin-top': '-15px'}} />
            <ul>
              <li>首页</li>
              <div
                onClick={this.gotoFIFA}
                onMouseEnter={this.showChildList}
                onMouseLeave={this.hideChildList}
              >
                <li>FIFA资讯</li>
              </div>
              <div onClick={this.gotoMatch}>
                <li>电竞赛事</li>
              </div>
            </ul>
          </div>
          <div className="rightheader">
            <Input placeholder="搜索" onPressEnter={this.searchInfo} />
            <Avatar shape="circle" icon="user" style={{height: 40, width: 40, lineHeight: '40px'}} />
          </div>
          <ChildList
            data={list}
            isShow={isShow}
            onMouseEnter={this.showChildList}
            onMouseLeave={this.hideChildList}
          />
        </div>
        <div style={{width: '80%', margin: '0 auto', 'margin-bottom': '31px'}}>
          <span className="headerLine" style={{background: '#fff', width: '113px'}} />
          <span className="headerLine" style={{background: '#709BE7', width: '67px'}} />
        </div>
        <Carousel vertical className="headerContent">
          <div>
            <div className="title_1">FIFA</div>
            <div className="title_2">Pitch Note:FIFA 19FUT Champions 周末联赛详解</div>
            <div className="title_3">更新补丁已在Origin平台进行推送。主要针对一些bug进行了修正。另外更新了几名球员的肖像。</div>
            <div className="title_4 flex">
              <div className="titleFooter">
                <div>Pitch Note:FIFA 19FUT Champions 周末联赛…</div>
                <div>FIFA</div>
              </div>
              <div className="titleFooter">
                <div>36个各级别联赛，FIFA 19包含联赛及俱乐部…</div>
                <div>FIFA Online</div>
              </div>
            </div>
          </div>
          <div>
            <div className="title_1">FIFA</div>
            <div className="title_2">Pitch Note:FIFA 19FUT Champions 周末联赛详解</div>
            <div className="title_3">更新补丁已在Origin平台进行推送。主要针对一些bug进行了修正。另外更新了几名球员的肖像。</div>
            <div className="title_4 flex">
              <div className="titleFooter">
                <div>Pitch Note:FIFA 19FUT Champions 周末联赛…</div>
                <div>FIFA</div>
              </div>
              <div className="titleFooter">
                <div>36个各级别联赛，FIFA 19包含联赛及俱乐部…</div>
                <div>FIFA Online</div>
              </div>
            </div>
          </div>
          <div>
            <div className="title_1">FIFA</div>
            <div className="title_2">Pitch Note:FIFA 19FUT Champions 周末联赛详解</div>
            <div className="title_3">更新补丁已在Origin平台进行推送。主要针对一些bug进行了修正。另外更新了几名球员的肖像。</div>
            <div className="title_4 flex">
              <div className="titleFooter">
                <div>Pitch Note:FIFA 19FUT Champions 周末联赛…</div>
                <div>FIFA</div>
              </div>
              <div className="titleFooter">
                <div>36个各级别联赛，FIFA 19包含联赛及俱乐部…</div>
                <div>FIFA Online</div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Fifaheader;
