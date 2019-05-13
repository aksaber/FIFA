import React, {Component} from 'react';
import {Comment, Avatar, Icon, message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReplyInput from './ReplyInput';
import '../style/components/comment.scss';
import axios from '../axios';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class SecondaryComment extends Component {
  state = {
    showReply: false,
    secondaryData: [],
    total: 0,
  };

  //获取该评论的二级评论
  // componentDidMount() {
  //   const {data} = this.props;
  //   const {pageNo} = this.state;
  //   axios.post('/news/member/twoLevelMessage', {
  //     asc: true,
  //     map: {id: data.id},
  //     nowPage: pageNo,
  //     pageSize: 9,
  //     sort: 'string'
  //   }).then((res) => {
  //     if (res.data.code === '0') {
  //       this.setState({
  //         secondaryData: res.data.data.records,
  //         total: res.data.data.total
  //       });
  //     } else {
  //       message.warning(res.data.msg);
  //     }
  //   }).catch((err) => {
  //     message.error(`${err}`);
  //   });
  // }

  //点击回复
  showReply = () => {
    const {home: {userInfo}} = this.props;
    if (Object.keys(userInfo).length === 0) {
      message.warning('请先登录再回复');
      return false;
    }
    this.setState({showReply: !this.state.showReply});
  };

  //回复后临时添加回复内容
  appendWords = (words) => {
    this.setState({
      total: words
    });
  };

  //获取二级评论
  getSecondaryMsg = () => {
    //通知父组件MultiComment重新获取二级评论
    this.props.getSecondaryMsg();
  };

  render() {
    const {showReply, secondaryData, total} = this.state;
    const {data, openComment} = this.props;
    return (
      <div className="comment" style={{borderBottom: 'unset'}}>
        <div className="comment_left">
          <Avatar
            icon={data.fromImgUrl ? '' : 'user'}
            src={data.fromImgUrl}
          />
        </div>
        <div className="comment_right">
          <div className="titleInfo">
            <span style={{fontWeight: 'bold'}}>{data.fromName}</span>
            <span style={{float: 'right'}}>{data.replyTime}</span>
          </div>
          <div className="commentContent">
            {data.replyContent}
            <Icon
              type="message"
              className="commentReply"
              onClick={this.showReply}
              style={{display: openComment === 0 ? 'none' : 'block'}}
            />
          </div>
          {showReply ? <ReplyInput
            name={data.fromName}
            commentId={data.commentId}
            rId={data.rId}
            userId={data.fromUid}
            type={2}
            getSecondaryMsg={() => this.getSecondaryMsg()}
            showReply={() => this.showReply()}
          /> : null}
        </div>
      </div>
    );
  }
}

export default SecondaryComment;
