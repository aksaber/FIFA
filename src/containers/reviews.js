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
  state = {
    reviewInfo: [],
    total: 0
    // pageNo: 1
  };

  componentDidMount() {
    axios.post('/user/message/selectByPage', {
      asc: true,
      map: {},
      nowPage: 1,
      pageSize: 5
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          reviewInfo: data.data.records,
          total: data.data.total
        });
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  reviewInfoMap = () => {
    const {reviewInfo} = this.state;
    const list = [];
    reviewInfo.map((item) => {
      list.push(<div className="msgFlame">
        <p style={{color: '#414141', fontSize: 18}}>{item.title}</p>
        <p style={{color: '#1A47B0'}}>{item.content}</p>
        <div style={{color: '#414141', fontWeight: 'bold'}}>
          <span style={{marginRight: 20}}>{item.createTime}</span>
        </div>
      </div>);
    });
    return list;
  };

  render() {
    const {reviewInfo, total} = this.state;
    return (
      <div>
        <div className="title">评论管理</div>
        <div>{this.reviewInfoMap()}</div>
      </div>
    );
  }
}

export default Reviews;
