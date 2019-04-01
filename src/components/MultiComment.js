import React, {Component} from 'react';
import {Comment, Avatar} from 'antd';
import ReplyInput from './ReplyInput';


class MultiComment extends Component {
  state = {
    showReply: false,
    data: {
      name: '张三',
      comment: '这个球进的好，角度刁钻',
    }
  }

  showReply = () => {
    console.log('aaa');
    this.setState({showReply: true});
  }

  render() {
    const {showReply, data} = this.state;
    return (
      <Comment
        actions={[<span onClick={this.showReply}>Reply to</span>]}
        author={<a >{data.name}     2019年4月1日</a>}
        avatar={(
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        )}
        content={
          <p> {data.comment}</p>}
      >
        {showReply ? <ReplyInput name={data.name} /> : null}
        {this.props.children}
      </Comment>
    );
  }
}

export default MultiComment;
