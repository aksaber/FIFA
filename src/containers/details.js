import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, Tag} from 'antd';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Details extends Component {
  state = {
  };

  render() {
    return (
      <div>
        <img />
        <article>假装这里有一篇很长很长的小作文</article>
        <div className="dashedLine" />
        <div>
          <div>
            <Tag color="green">green</Tag>
          </div>
          <p>微信qq</p>
        </div>
        <div>
          <div className="dashedLine" />
          <p>留言</p>
          <div className="dashedLine" />
        </div>
      </div>
    );
  }
}

export default Details;
