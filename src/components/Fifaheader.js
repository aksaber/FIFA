import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input, Carousel, message} from 'antd';

import logo from '~/assets/img/logo.svg';
import ChildList from '../components/childList';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

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
      carouselData: [],
      isShow: false,
    };
  }

  //banner切换路由
  gotoNav = (type) => {
    const {history, changeRoute} = this.props;
    changeRoute();
    switch (type) {
      case 'home':
        history.push('/home');
        break;
      case 'information':
        history.push('informations');
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

  componentDidMount() {
    axios.get('/news/newsTopList?type=0&typeId=1').then((response) => {
      const {data} = response;
      console.log(data);
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


  render() {
    const {list, isShow, carouselData} = this.state;
    return (
      <div className="header">
        <div className="fifaheader container">
          <div className="leftheader">
            <img src={logo} width={45} height={34} style={{'margin-top': '-15px'}} />
            <ul>
              <div onClick={() => this.gotoNav('home')}><li>首页</li></div>
              <div
                onClick={() => this.gotoNav('information')}
                onMouseEnter={this.showChildList}
                onMouseLeave={this.hideChildList}
              >
                <li>FIFA资讯</li>
              </div>
              <div onClick={() => this.gotoNav('match')}><li>电竞赛事</li></div>
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
        <div className="container" style={{marginBottom: '31px'}}>
          <span className="headerLine" style={{background: '#fff', width: '113px'}} />
          <span className="headerLine" style={{background: '#709BE7', width: '67px'}} />
        </div>
        <Carousel className="headerContent container" autoplay>
          {carouselData.map((item, index) => (
            <div>
              <div className="title_1">FIFA</div>
              <div className="title_2">{item.title}</div>
              <div className="title_3">{item.summary}</div>
              <div className="title_4 flex">
                <div className="titleFooter">
                  <div>{carouselData[index === 2 ? 0 : 1 - index].title}</div>
                  <div>FIFA</div>
                </div>
                <div className="titleFooter">
                  <div>{carouselData[index === 2 ? 1 : 2].title}</div>
                  <div>FIFA Online</div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Fifaheader;
