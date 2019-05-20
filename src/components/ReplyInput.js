import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, Button, message} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

const stylesheet = {
  ReplyInput: {
    padding: '10px 18px 18px',
    margin: '10%',
    height: '434px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
    opacity: 1,
    borderRadius: '5px',
    textAlign: 'center',
    border: '1px solid #fff'
  },
  ReplyInputImg: {
    width: '100%',
    height: 239,
    background: '#000',
    opacity: 1
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class ReplyInput extends Component {
  state = {
    reply: `回复${this.props.name}:`
  };


  //回复一级评论或回复某人
  replyComment = () => {
    const {home: {userInfo}} = this.props;
    if (Object.keys(userInfo).length === 0) {
      message.warning('请先登录再回复');
      return false;
    }
    //type=1为回复一级评论，type=2为回复某人
    axios.post('/news/member/reply', {
      commentId: this.props.commentId,
      replyId: this.props.type === 1 ? this.props.commentId : this.props.rId,
      replyContent: this.state.reply,
      replyType: this.props.type,
      fromUid: userInfo.id,
      toUid: this.props.userId
    }).then((res) => {
      if (res.data.code === '0') {
        //关闭回复框
        this.props.showReply();
        //通知父组件重新请求评论接口
        this.props.getSecondaryMsg();
        message.success('回复成功');
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };
  render() {
    const {reply} = this.state;
    const {TextArea} = Input;
    return (
      <div className="reply">
        <TextArea
          rows={4}
          value={reply}
          name="reply"
          onChange={this._changeValue}
        />
        <Button onClick={this.replyComment}>回复</Button>
      </div>
    );
  }
}

export default ReplyInput;
