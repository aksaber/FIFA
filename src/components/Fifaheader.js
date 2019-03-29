import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input, Carousel} from 'antd';

import logo from '~/assets/img/logo.svg';
import ChildList from '../components/childList';
import * as homeActions from '../redux/reduces/home';

let timer = '';
let timer2 = '';

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
          name: 'FUT Champions',
          url: ''
        },
        {
          name: 'FIWC 电子足球世界杯',
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
  showChildList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(timer);
    clearTimeout(timer2);
    timer = setTimeout(() => {
      this.setState({
        isShow: true
      });
      console.log('true');
    }, 1000);
  };

  //鼠标移出
  hideChildList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(timer);
    clearTimeout(timer2);
    timer2 = setTimeout(() => {
      this.setState({
        isShow: false
      });
      console.log('false');
    }, 1000);
  };

  render() {
    const {list, isShow} = this.state;
    return (
      <div>
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
            <Avatar shape="circle" icon="user" />
          </div>
          <ChildList
            data={list}
            isShow={isShow}
            onMouseEnter={this.showChildList}
            onMouseLeave={this.hideChildList}
          />
        </div>
        <Carousel vertical>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
      </div>
    );
  }
}

export default Fifaheader;
