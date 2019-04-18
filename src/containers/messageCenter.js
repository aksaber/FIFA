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

class MessageCenter extends Component {
  render() {
    return (
      <div>
        <div className="title">消息中心</div>
        <div className="msgFlame">
          <p style={{color: '#1A47B0', fontSize: 18}}>关于非凡赛事报名详情通知</p>
          <p style={{color: '#606060'}}>阿迪达斯夏练国度 数字金球争霸赛 将于北京时间8月11日拉开帷幕，华北、华东、华南、港澳台四个…</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
        <div className="msgFlame">
          <p style={{color: '#1A47B0', fontSize: 18}}>关于非凡赛事报名详情通知</p>
          <p style={{color: '#606060'}}>阿迪达斯夏练国度 数字金球争霸赛 将于北京时间8月11日拉开帷幕，华北、华东、华南、港澳台四个…</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
        <div className="msgFlame">
          <p style={{color: '#1A47B0', fontSize: 18}}>关于非凡赛事报名详情通知</p>
          <p style={{color: '#606060'}}>阿迪达斯夏练国度 数字金球争霸赛 将于北京时间8月11日拉开帷幕，华北、华东、华南、港澳台四个…</p>
          <div style={{color: '#414141', fontWeight: 'bold'}}>
            <span style={{marginRight: 20}}>2019-03-26</span>
            <span>12:33</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageCenter;
