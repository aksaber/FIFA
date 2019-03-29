import React, {Component} from 'react';
import {Comment, Avatar} from 'antd';


class MultiComment extends Component {
  render() {
    return (
      <Comment
        actions={[<span>Reply to</span>]}
        author={<a > Han Solo</a>}
        avatar={(
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        )}
        content={
          <p> We supply a series of design principles, practical patterns and high quality design resources(Sketch and Axure).</p>}
      >
        {this.props.children}
      </Comment>
    );
  }
}

export default MultiComment;
