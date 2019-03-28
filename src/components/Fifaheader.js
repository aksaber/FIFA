import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar, Input, Carousel} from 'antd';

import logo from '~/assets/img/logo.svg';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifaheader extends Component {
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
  }

  //搜索框输入
  searchInfo = () => {
    alert('搜索内容');
  };

  render() {
    return (
      <div>
        <div className="fifaheader">
          <div className="leftheader">
            <img src={logo} width={45} height={34} style={{'margin-top': '-15px'}} />
            <ul>
              <li>首页</li>
              <div onClick={this.gotoFIFA}>
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
