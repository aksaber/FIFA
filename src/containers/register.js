import React, {Component} from 'react';
import {Row, Col, Input, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import '../style/login.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Register extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default Register;
