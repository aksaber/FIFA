import React, {Component} from 'react';
import {Comment, Avatar} from 'antd';
import ReplyInput from './ReplyInput';


class MultiComment extends Component {
  state = {
    showReply: false,
    // data: {
    //   name: '张三',
    //   comment: '这个球进的好，角度刁钻',
    // }
  }

  showReply = () => {
    console.log('aaa');
    this.setState({showReply: true});
  }

  render() {
    const {showReply} = this.state;
    const {data} = this.props;
    return (
      <Comment
        actions={[<span onClick={this.showReply}>Reply to</span>]}
        author={<a >{data.userName}     {data.messageTime}</a>}
        avatar={(
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        )}
        content={
          <p>{data.content}</p>}
      >
        {showReply ? <ReplyInput name={data.userName} /> : null}
        {this.props.children}
      </Comment>
    );
  }
}

export default MultiComment;
