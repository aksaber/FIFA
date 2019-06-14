import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {message} from 'antd';
import * as homeActions from '../redux/reduces/home';
import Fifaheader from '../components/Fifaheader';
import MobileFifaheader from '../components/mobile-Fifaheader';
import Fifafooter from '../components/Fifafooter';
import axios from '../axios';
/*
使用注解的方式修改state和组件之间的传值 @connect()
state => ({home: state.home})  你需要state当中的什么参数，取出来就会放到props相对的参数当中
dispatch => bindActionCreators(actionCreators, dispatch) 你需要state当中的什么方法，就可写到下面的大括号中就能被放到props当中，并自动dispatch
*/
@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class App extends Component {
  state = {
  };
  //将要装载，在render之前调用
  componentWillMount() {
    const {
      history,
      getToken,
      isFixFun,
      screenWidth,
      home: {currentRoute}
    } = this.props;
    //根据cookie获取token
    getToken();
    //获取屏幕宽度
    screenWidth(window.screen.width);
    //监听滚动条高度
    window.addEventListener('scroll', (e) => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 90) {
        isFixFun(true);
      } else {
        isFixFun(false);
      }
    });
    //当前路由为'/'时跳转到home首页
    if (!currentRoute || currentRoute === '#/') {
      history.push('/home');
    }
  }

  //获取用户信息
  componentDidMount() {
    const {getUserInfo, getToken} = this.props;
    getToken();
    //获取用户个人信息
    axios.get('/user/member/getUserInfo').then(res => {
      const {data} = res;
      if (data.code === '0') {
        getUserInfo(data.data);
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      // message.error(`${err}`);
      console.log('未登录');
    });
  }

  render() {
    const {home: {screenW}} = this.props;
    return (
      <div className="home">
        {screenW > 768 ?
          <Fifaheader
            history={this.props.history}
            location={this.props.location}
          />
          :
          <MobileFifaheader
            history={this.props.history}
            location={this.props.location}
          />
        }
        <div style={{marginTop: screenW < 768 ? 60 : 90}}>
          {this.props.children}
        </div>
        <Fifafooter history={this.props.history} location={this.props.location} />
      </div>
    );
  }
}

export default App;
