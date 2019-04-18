import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input, message} from 'antd';
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
      isFixed: false
    };
  }

  //banner切换路由
  gotoNav = (type) => {
    const {history, changeRoute} = this.props;
    switch (type) {
      case 'home':
        changeRoute('home');
        history.push('/home');
        break;
      case 'information':
        changeRoute('informations');
        history.push('/informations');
        break;
      case 'match':
        changeRoute('match');
        history.push('/match');
        break;
      default:
        break;
    }
  };

  //搜索框输入
  searchInfo = () => {
    console.log('搜索内容');
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

  componentDidMount() {
    //监听滚动条高度
    window.addEventListener('scroll', (e) => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 90) {
        this.setState({isFixed: true});
      } else {
        this.setState({isFixed: false});
      }
    });

    //首页置顶广告
    axios.get('/news/firstNews').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({homeList: data.data.firstNews});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //FIFA资讯分类
    axios.get('/news/newsType?type=0').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({infoList: data.data});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //电竞赛事分类
    axios.get('/news/newsType?type=1').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({matchList: data.data});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //FIFA资讯置顶轮播
    axios.get('/news/newsTopList?type=0&typeId=1').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({carouselData: data.data});
        // , content: data.data.info.content
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  //跳转登录页面
  gotoLogin = () => {
    const {history, changeRoute} = this.props;
    changeRoute('login');
    history.push('/login');
  };

  render() {
    const {
      infoList,
      homeList,
      matchList,
      isShow,
      isShow2,
      carouselData,
      isFixed
    } = this.state;
    const {home: {currentRoute, detailData}} = this.props;
    const styleFixed = {
      position: 'fixed'
    };
    //顶部广告轮播
    const getAdvert = () => {
      let DOM = '';
      if (currentRoute.indexOf('home') > -1) {
        DOM = <HomeAdvert data={homeList} />;
      } else if (currentRoute.indexOf('userInfo') > -1) {
        DOM = '';
      } else if (currentRoute.indexOf('detail') > -1) {
        DOM = <InfoAdvert data={detailData} />;
      } else {
        DOM = <InfoAdvert data={carouselData} />;
      }
      return DOM;
    };

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
              <Input placeholder="搜索" onPressEnter={this.searchInfo} />
              <Avatar onClick={this.gotoLogin} shape="circle" icon="user" style={{height: 40, width: 40, lineHeight: '40px'}} />
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
