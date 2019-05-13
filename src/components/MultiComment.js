import React, {Component} from 'react';
import {Comment, Avatar, Icon, message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReplyInput from './ReplyInput';
import SecondaryComment from './SecondaryComment';
import '../style/components/comment.scss';
import axios from '../axios';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MultiComment extends Component {
  state = {
    showReply: false,
    secondaryData: [],
    pageNo: 1,
    total: 0,
  };

  //获取该评论的二级评论
  componentDidMount() {
    this.getSecondaryMessage();
  }

  //获取二级评论
  getSecondaryMessage = () => {
    const {data} = this.props;
    const {pageNo} = this.state;
    axios.post('/news/member/twoLevelMessage', {
      asc: false,
      map: {id: data.id},
      nowPage: pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          secondaryData: res.data.data.records,
          total: res.data.data.total
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //点击回复
  showReply = () => {
    const {home: {userInfo}} = this.props;
    if (Object.keys(userInfo).length === 0) {
      message.warning('请先登录再回复');
      return false;
    }
    this.setState({showReply: !this.state.showReply});
  };

  render() {
    const {showReply, secondaryData, total} = this.state;
    const {data, openComment} = this.props;
    return (
      <div className="comment">
        <div className="comment_left">
          <Avatar
            icon={data.imgUrl ? '' : 'user'}
            src={data.imgUrl}
          />
        </div>
        <div className="comment_right">
          <div className="titleInfo">
            <span style={{fontWeight: 'bold'}}>{data.userName}</span>
            <span style={{float: 'right'}}>{data.messageTime}</span>
          </div>
          <div className="commentContent">
            {data.content}
            <Icon
              type="message"
              className="commentReply"
              onClick={this.showReply}
              style={{display: openComment === 0 ? 'none' : 'block'}}
            />
          </div>
          {showReply ? <ReplyInput
            name={data.userName}
            commentId={data.id}
            type={1}
            getSecondaryMsg={() => this.getSecondaryMessage()}
            showReply={() => this.showReply()}
          /> : null}
          <div
            style={{
              display: secondaryData.length > 0 ? 'block' : 'none',
              borderTop: '2px solid #f6f6f6',
              marginTop: 25
            }}
          >
            {secondaryData.map((item) => (
              <SecondaryComment
                data={item}
                key={item.id}
                openComment={openComment}
                getSecondaryMsg={() => this.getSecondaryMessage()}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MultiComment;
