import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Avatar,
  Input,
  message,
  Menu,
  Dropdown
} from 'antd';
import $ from 'jquery';

import logo from '~/assets/img/logo.svg';
import ChildList from '../components/childList';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import InfoAdvert from './infoAdvert';
import HomeAdvert from './homeAdvert';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifaheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeList: [],
      infoList: [],
      matchList: [],
      carouselData: [],
      isShow: false,
      isShow2: false,
      content: '',
      urlParams: this.formatSearch(props.location.search)
    };
  }

  //banner切换路由
  gotoNav = (type) => {
    const {history} = this.props;
    switch (type) {
      case 'home':
        history.push('/home');
        break;
      case 'information':
        history.push('/informations');
        break;
      case 'match':
        history.push('/match');
        break;
      default:
        break;
    }
  };

  //搜索框输入
  searchInfo = () => {
    const {history} = this.props;
    const {content} = this.state;
    if (content === '') {
      return false;
    }
    history.push(`/search?content=${content}`);
  };

  //鼠标hover出现子资讯列表
  showChildList = (type) => {
    if (type === 0) {
      //资讯分类
      this.setState({isShow: true});
    } else {
      //赛事分类
      this.setState({isShow2: true});
    }
  };

  //鼠标移出
  hideChildList = (type) => {
    if (type === 0) {
      //资讯分类
      this.setState({isShow: false});
    } else {
      //赛事分类
      this.setState({isShow2: false});
    }
  };

  formatSearch = (url) => {
    if (typeof url !== 'undefined') {
      url = url.substr(1);
      //把字符串分割为字符串数组
      const arr = url.split('&');
      let obj = {};
      const objAssign = {};
      let newarr = [];
      arr.forEach((item) => {
        newarr = item.split('=');
        obj = {[newarr[0]]: newarr[1]};
        Object.assign(objAssign, obj);
      });
      return objAssign;
    }
  };

  componentDidMount() {
    // //监听滚动条高度
    // window.addEventListener('scroll', (e) => {
    //   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //   if (scrollTop > 90) {
    //     this.setState({isFixed: true});
    //   } else {
    //     this.setState({isFixed: false});
    //   }
    // });
    const {home: {currentRoute}} = this.props;
    if (currentRoute.indexOf('home') > -1
      || currentRoute.indexOf('#/') > -1
      || !currentRoute
      || currentRoute.indexOf('login') > -1) {
      //首页置顶广告
      this.getHomeSetTop();
    } else if (this.state.urlParams.id
      && (currentRoute.indexOf('informations') > -1
      || currentRoute.indexOf('match') > -1)) {
      //FIFA资讯置顶轮播
      this.getInfoSetTop();
    }
    //FIFA资讯分类
    this.getInfoClassify();
    //电竞赛事分类
    this.getMatchClassify();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        urlParams: this.formatSearch(nextProps.location.search)
      }, () => {
        const {home: {currentRoute}} = this.props;
        if (currentRoute.indexOf('home') > -1) {
          //首页置顶广告
          this.getHomeSetTop();
        } else if (this.state.urlParams.id && (currentRoute.indexOf('informations') > -1
          || currentRoute.indexOf('match') > -1)) {
          //FIFA资讯置顶轮播
          this.getInfoSetTop();
        }
        //FIFA资讯分类
        this.getInfoClassify();
        //电竞赛事分类
        this.getMatchClassify();
      });
    }
  }

  //首页置顶广告
  getHomeSetTop = () => {
    axios.get('/news/news/firstNews').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({homeList: data.data.firstNews});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //FIFA资讯分类
  getInfoClassify = () => {
    const {saveClassify} = this.props;
    axios.get('/news/news/newsType?type=0').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({infoList: data.data});
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
        this.setState({matchList: data.data});
        //存放redux供组件Fifafooter获取赛事分类
        saveClassify(1, data.data);
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //FIFA资讯置顶轮播
  getInfoSetTop = () => {
    axios.get(`/news/news/newsTopList?type=0&typeId=${this.state.urlParams.id}`).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({carouselData: data.data});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //跳转登录页面
  gotoLogin = () => {
    const {history} = this.props;
    if (document.cookie) {
      const cookieArr = document.cookie.split(';');
      for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].split('=')[0].trim() === 'fifaToken') {
          document.cookie = `fifaToken=;expires=${(new Date(0)).toGMTString()}`;
        }
      }
    }
    history.push('/login');
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //跳转用户中心
  gotoUserInfo = (router) => {
    const {history} = this.props;
    history.push(`/userInfo/${router}`);
  };

  render() {
    const {
      infoList,
      homeList,
      matchList,
      isShow,
      isShow2,
      carouselData,
      content
    } = this.state;
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
    //顶部广告轮播
    const getAdvert = () => {
      let DOM = '';
      if (currentRoute.indexOf('home') > -1) {
        //首页广告轮播图展示
        DOM = <HomeAdvert data={homeList} />;
      } else if (pathname.indexOf('userInfo') > -1) {
        //用户页面无展示
        DOM = '';
      } else if (currentRoute.indexOf('detail') > -1 || currentRoute.indexOf('Detail') > -1) {
        //详情页展示
        DOM = <InfoAdvert data={detailData} location={this.props.location} />;
      } else {
        //资讯、赛事分类的列表展示
        DOM = (<InfoAdvert
          data={carouselData}
          location={this.props.location}
          history={this.props.history}
        />);
      }
      return DOM;
    };

    const menu = (
      <Menu style={{padding: '19px 19px 1px'}}>
        <div className="flex" style={{paddingBottom: 20, borderBottom: '1px solid #f0f0f0'}}>
          {userInfo.headPortraitUrl ? <img
            src={userInfo.headPortraitUrl}
            width={60}
            height={60}
            style={{marginRight: 24, borderRadius: '50%'}}
          /> : <Avatar
            shape="circle"
            icon="user"
            style={{
              fontSize: 16,
              width: 36,
              height: 36,
              margin: '15px 20px 0 0'
            }}
          />}
          <div
            className="flex_1"
            style={{fontSize: 20, color: '#1A47B0', marginTop: 15}}
          >{userInfo.name}</div>
        </div>
        <Menu.Item
          className="menuItem"
          style={{
            padding: 0,
            color: '#1A47B0',
            fontSize: 16,
            margin: '30px 0'
          }}
        >
          <a onClick={() => this.gotoUserInfo('userInformation')}>用户信息</a>
        </Menu.Item>
        <Menu.Item className="menuItem" style={{padding: 0}}>
          <a onClick={() => this.gotoUserInfo('accountManagement')}>账号管理</a>
        </Menu.Item>
        <Menu.Item className="menuItem" style={{marginBottom: 20, padding: 0}}>
          <a onClick={() => this.gotoUserInfo('messageCenter')}>消息中心</a>
        </Menu.Item>
        <Menu.Item className="menuItem" style={{padding: 0}}>
          <a onClick={this.gotoLogin}>退出登录</a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="header">
        <div className={isFixed ? 'fixedFlame' : ''}>
          <div className="fifaheader container">
            <div className="leftheader">
              <img src={logo} width={45} height={34} style={{'margin-top': '-15px'}} />
              <ul>
                <div onClick={() => this.gotoNav('home')}><li>首页</li></div>
                <div
                  onMouseEnter={() => this.showChildList(0)}
                  onMouseLeave={() => this.hideChildList(0)}
                >
                  <li>FIFA资讯</li>
                </div>
                <div
                  onMouseEnter={() => this.showChildList(1)}
                  onMouseLeave={() => this.hideChildList(1)}
                >
                  <li>电竞赛事</li>
                </div>
              </ul>
            </div>
            <div className="rightheader">
              <Search
                value={content}
                onChange={this._changeValue}
                name="content"
                placeholder="搜索"
                onPressEnter={this.searchInfo}
                onSearch={this.searchInfo}
              />
              {Object.keys(userInfo).length !== 0 ?
                <Dropdown overlay={menu} placement="bottomRight">
                  <Avatar
                    shape="circle"
                    icon={userInfo.headPortraitUrl ? '' : 'user'}
                    src={userInfo.headPortraitUrl}
                    className="avator_user"
                  />
                </Dropdown> : <Avatar
                  onClick={this.gotoLogin}
                  shape="circle"
                  icon={userInfo.headPortraitUrl ? '' : 'user'}
                  src={userInfo.headPortraitUrl}
                  className="avator_user"
                />}
            </div>
            <ChildList
              data={infoList}
              type={0}
              history={this.props.history}
              isShow={isShow}
              onMouseEnter={() => this.showChildList(0)}
              onMouseLeave={() => this.hideChildList(0)}
            />
            <ChildList
              data={matchList}
              type={1}
              history={this.props.history}
              isShow={isShow2}
              onMouseEnter={() => this.showChildList(1)}
              onMouseLeave={() => this.hideChildList(1)}
            />
          </div>
        </div>
        {getAdvert()}
      </div>
    );
  }
}

export default Fifaheader;
