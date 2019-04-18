import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  message,
  Button,
  Input
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Reviews extends Component {
  render() {
    return (
      <div>
        <div className="title">评论管理</div>
        <div className="msgFlame">
          <p style={{color: '#414141', fontSize: 18}}>我觉得这个活动举办的很好！！！！</p>
          <p style={{color: '#1A47B0'}}>文章:FUT Champions世界总决赛决赛实况录像Rockyy vs Shellzz</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
        <div className="msgFlame">
          <p style={{color: '#414141', fontSize: 18}}>我觉得这个活动举办的很好！！！！</p>
          <p style={{color: '#1A47B0'}}>文章:FUT Champions世界总决赛决赛实况录像Rockyy vs Shellzz</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
        <div className="msgFlame">
          <p style={{color: '#414141', fontSize: 18}}>我觉得这个活动举办的很好！！！！</p>
          <p style={{color: '#1A47B0'}}>文章:FUT Champions世界总决赛决赛实况录像Rockyy vs Shellzz</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;
