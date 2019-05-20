import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  message,
  Pagination
} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MessageCenter extends Component {
  state = {
    messageInfo: [],
    total: 0
    // pageNo: 1
  };
  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('messageCenter');
    this.getMessage();
  }

  //获取消息中心
  getMessage = (pageNo) => {
    axios.post('/user/message/getNoticeList', {
      asc: true,
      map: {},
      nowPage: pageNo || 1,
      pageSize: 3
    }).then(res => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          messageInfo: data.data.records,
          total: data.data.total
        });
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  msgInfoMap = () => {
    const {messageInfo} = this.state;
    const list = [];
    messageInfo.map((item) => {
      list.push(<div className="msgFlame">
        <p style={{color: '#1A47B0', fontSize: 18}}>{item.title}</p>
        <p style={{color: '#606060'}}>{item.content}</p>
        <div style={{color: '#414141', fontWeight: 'bold'}}>
          <span style={{marginRight: 20}}>
            {moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}
          </span>
        </div>
      </div>);
    });
    return list;
  };

  render() {
    const {messageInfo, total} = this.state;
    return (
      <div>
        <div className="title">消息中心</div>
        <div>{this.msgInfoMap()}</div>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={3}
          total={total}
          onChange={this.getMessage}
        />
      </div>
    );
  }
}

export default MessageCenter;
