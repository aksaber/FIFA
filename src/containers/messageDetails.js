import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  message,
  Col,
  Icon,
  Pagination
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MessageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      data: {}
    };
  }
  componentDidMount() {
    this.getMessageDetail();
  }
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
  //获取消息详情
  getMessageDetail = () => {
    axios.get(`/user/message/getNoticeInfo?id=${this.state.urlParams.id}`)
      .then(res => {
        const {data} = res;
        if (data.code === '0') {
          this.setState({data: data.data});
        } else {
          message.warning(data.msg);
        }
      })
      .catch((err) => {
        message.error(`${err}`);
      });
  };
  //回到消息中心列表
  goBack = () => {
    const {history} = this.props;
    history.go(-1);
  };
  render() {
    const {data} = this.state;
    return (
      <div>
        <div className="title">
          <Icon
            type="left"
            style={{
              fontSize: 18,
              marginRight: 10,
              color: '#313131',
              cursor: 'pointer'
            }}
            onClick={this.goBack}
          />
          {data.title}
          <span style={{color: '#000', fontSize: 14, marginLeft: 30}}>
            {moment(data.createTime).format('YYYY-MM-DD hh:mm:ss')}
          </span>
        </div>
        <div
          style={{padding: '29px', minHeight: 400}}
          dangerouslySetInnerHTML={{__html: data.content}}
        />
      </div>
    );
  }
}

export default MessageDetails;
