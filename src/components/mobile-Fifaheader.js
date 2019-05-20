import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Avatar,
  Input,
  message,
  Row,
  Col,
  Icon,
  Menu,
  Dropdown,
  Button
} from 'antd';

import logo from '~/assets/img/logo.svg';
import * as homeActions from '../redux/reduces/home';
import MobileHeaderCard from './mobile-header-card';
import '../style/mobileStyle/header.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MobileFifaheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      content: '',
      infoList: [],
      infoListDefault: [],
      infoListComplete: [],
      matchList: [],
      matchListDefault: [],
      matchListComplete: []
    };
  }

  componentDidMount() {
    //FIFA资讯分类
    this.getInfoClassify();
    //电竞赛事分类
    this.getMatchClassify();
  }

  //FIFA资讯分类
  getInfoClassify = () => {
    const {saveClassify} = this.props;
    axios.get('/news/news/newsType?type=0').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          infoList: data.data.slice(0, 4),
          infoListDefault: data.data.slice(0, 4),
          infoListComplete: data.data
        });
        //存放redux供组件Fifafooter获取资讯分类
        saveClassify(0, data.data);
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //电竞赛事分类
  getMatchClassify = () => {
    const {saveClassify} = this.props;
    axios.get('/news/news/newsType?type=1').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          matchList: data.data.slice(0, 4),
          matchListDefault: data.data.slice(0, 4),
          matchListComplete: data.data
        });
        //存放redux供组件Fifafooter获取赛事分类
        saveClassify(1, data.data);
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  initInfoList = () => {
    const {infoList} = this.state;
    const list = [];
    infoList.map(item => {
      list.push(<Col md={12} xs={12} style={{padding: '0 8px'}}>
        <MobileHeaderCard
          type={0}
          data={item}
          history={this.props.history}
          toggleMenu={this.toggleMenu}
        /></Col>);
    });
    return list;
  };

  initMatchList = () => {
    const {matchList} = this.state;
    const list = [];
    matchList.map(item => {
      list.push(<Col md={12} xs={12} style={{padding: '0 8px'}}>
        <MobileHeaderCard
          type={0}
          data={item}
          history={this.props.history}
          toggleMenu={this.toggleMenu}
        /></Col>);
    });
    return list;
  };

  //显示隐藏菜单
  toggleMenu = () => {
    this.setState({showMenu: !this.state.showMenu});
  };

  //搜索框输入
  searchInfo = () => {
    const {history} = this.props;
    const {content} = this.state;
    if (content === '') {
      return false;
    }
    this.setState({showMenu: false});
    history.push(`/search?content=${content}`);
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //跳转页面
  gotoTarget = (router) => {
    const {history} = this.props;
    this.setState({showMenu: false});
    history.push(`/${router}`);
  };

  //获取完整列表
  getCompleteList = (type) => {
    const {
      infoListDefault,
      infoListComplete,
      matchListDefault,
      matchListComplete
    } = this.state;
    if (type === 0) {
      this.setState({
        infoList: this.state.infoList.length === 4 ? infoListComplete : infoListDefault
      });
    } else {
      this.setState({
        matchList: this.state.matchList.length === 4 ? matchListComplete : matchListDefault
      });
    }
  };

  render() {
    const {showMenu, content} = this.state;
    const {
      home: {
        userInfo,
        currentRoute,
        detailData,
        isFixed
      },
      location: {pathname}
    } = this.props;
    const {Search} = Input;
    return (
      <div className="mobileHeader">
        <div style={{padding: '0 17px', lineHeight: '60px'}}>
          <div style={{height: 60}}>
            <img src={logo} width={30} height={23} className="logo" />
            <span style={{fontSize: 22}}>17FIFA</span>
          </div>
          <div className="iconBar" onClick={this.toggleMenu}>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </div>
        </div>
        {showMenu ? <div className="menu">
          <div className="flex">
            <Search
              value={content}
              onChange={this._changeValue}
              name="content"
              placeholder="搜索"
              onPressEnter={this.searchInfo}
              onSearch={this.searchInfo}
              className="flex_1"
              style={{marginRight: 15}}
            />
            <Avatar
              onClick={() => this.gotoTarget('login')}
              shape="circle"
              size="large"
              icon={userInfo.headPortraitUrl ? '' : 'user'}
              src={userInfo.headPortraitUrl}
              className="avator_user"
            />
          </div>
          <div className="title" onClick={() => this.gotoTarget('home')}>首页</div>
          <div className="title">
            FIFA资讯
            <Icon
              type="down"
              onClick={() => this.getCompleteList(0)}
              style={{float: 'right'}}
            />
          </div>
          <Row>{this.initInfoList()}</Row>
          <div className="title">
            电竞赛事
            <Icon
              type="down"
              onClick={() => this.getCompleteList(1)}
              style={{float: 'right'}}
            />
          </div>
          <Row>{this.initMatchList()}</Row>
        </div> : ''}
      </div>
    );
  }
}

export default MobileFifaheader;
