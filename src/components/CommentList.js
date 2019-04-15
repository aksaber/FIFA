import React, {Component} from 'react';
import {message} from 'antd';
import ReplyInput from './ReplyInput';
import axios from '../axios';
import MultiComment from './MultiComment';


class CommentList extends Component {
  state = {
    showReply: false,
    data: [],
    pageNo: 1,
    total: 0,
  }

  componentDidMount() {
    this.fetchData(this.state.pageNo);
  }

  fetchData = (pageNo) => {
    axios.post(
      '/member/messageList',
      {
        asc: true,
        map: {id: this.props.articleId},
        nowPage: pageNo,
        pageSize: 9,
        sort: 'string'
      }
    ).then((response) => {
      if (response.data.code === '0') {
        this.setState({data: response.data.data.records, total: response.data.data.total});
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  loadMore = async () => {
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post(
      '/member/messageList',
      {
        asc: true,
        map: {id: this.props.articleId},
        nowPage: this.state.pageNo,
        pageSize: 9,
        sort: 'string'
      }
    ).then((response) => {
      if (response.data.code === '0') {
        this.setState({data: this.state.data.concat(response.data.data.records), total: response.data.data.total});
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }


  render() {
    const {showReply, data, total} = this.state;
    return (
      <div style={{padding: '60px 0 93px 0'}}>
        {data.map((item) => (
          <MultiComment data={item} key={item.id} />
        ))}
        {data.length < total ?
          <div style={{textAlign: 'center'}}><button className="loadMoreBtn" onClick={this.loadMore}>查看更多评论</button></div>
          : <div style={{textAlign: 'center'}}><button className="loadMoreBtn" >没有更多评论</button></div>}
      </div>
    );
  }
}

export default CommentList;
