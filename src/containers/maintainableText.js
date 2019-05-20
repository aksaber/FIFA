import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {message} from 'antd';
import * as homeActions from '../redux/reduces/home';
import '../style/illustration.scss';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MaintainableText extends Component {
  state = {
    content: ''
  };

  componentDidMount() {
    axios.get('/news/about/getAbout').then(res => {
      if (res.data.code === '0') {
        this.setState({content: res.data.data[0].content});
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  render() {
    const {content} = this.state;
    return (
      <div className="illustration">
        <div style={{fontSize: 40, marginBottom: 40}}>关于我们</div>
        <div className="content" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    );
  }
}

export default MaintainableText;
