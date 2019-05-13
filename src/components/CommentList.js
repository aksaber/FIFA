import React, {Component} from 'react';
import {message} from 'antd';
import ReplyInput from './ReplyInput';
import axios from '../axios';
import MultiComment from './MultiComment';


class CommentList extends Component {
  state = {
    showReply: false,
  };

  // componentDidMount() {
  //   this.fetchData(this.state.pageNo);
  // }
  //
  // //获取当篇文章的一级评论
  // fetchData = (pageNo) => {
  //   axios.post('/news/member/messageList', {
  //     asc: true,
  //     map: {id: this.props.articleId},
  //     nowPage: pageNo,
  //     pageSize: 9,
  //     sort: 'string'
  //   }).then((res) => {
  //     if (res.data.code === '0') {
  //       this.setState({data: res.data.data.records, total: res.data.data.total});
  //     } else {
  //       message.warning(res.data.msg);
  //     }
  //   }).catch((err) => {
  //     message.error(`${err}`);
  //   });
  // };

  //加载更多
  // loadMore = async () => {
  //   await this.setState({pageNo: this.state.pageNo + 1});
  //   axios.post('/news/member/messageList', {
  //     asc: true,
  //     map: {id: this.props.articleId},
  //     nowPage: this.state.pageNo,
  //     pageSize: 9,
  //     sort: 'string'
  //   }).then((res) => {
  //     if (res.data.code === '0') {
  //       this.setState({
  //         data: this.state.data.concat(res.data.data.records),
  //         total: res.data.data.total
  //       });
  //     } else {
  //       message.warning(res.data.msg);
  //     }
  //   }).catch((err) => {
  //     message.error(`${err}`);
  //   });
  // };

  render() {
    const {showReply} = this.state;
    const {data, openComment} = this.props;
    return (
      <div>
        {data.map((item) => (
          <MultiComment data={item} key={item.id} openComment={openComment} />
        ))}
      </div>
    );
  }
}

export default CommentList;
