import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Input, message, Button} from 'antd';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

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
  render() {
    const {TextArea} = Input;
    return (
      <div>
        <TextArea rows={4} defaultValue={`回复${this.props.name}:`} />
        <Button type="primary">回复</Button>
      </div>
    );
  }
}

export default ReplyInput;
