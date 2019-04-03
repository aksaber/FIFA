import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col} from 'antd';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Match extends Component {
  state = {
  };

  render() {
    const data = [
      {
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      },
    ];
    return (
      <div className="container">
        <Row>
          <Col span={8}><CommonCard data={data[0]} /></Col>
          <Col span={8}><CommonCard data={data[1]} /></Col>
          <Col span={8}><CommonCard data={data[2]} /></Col>
        </Row>
        <Row>
          <Col span={8}><CommonCard data={data[0]} /></Col>
          <Col span={8}><CommonCard data={data[1]} /></Col>
          <Col span={8}><CommonCard data={data[2]} /></Col>
        </Row>
        <Row>
          <Col span={8}><CommonCard data={data[0]} /></Col>
          <Col span={8}><CommonCard data={data[1]} /></Col>
          <Col span={8}><CommonCard data={data[2]} /></Col>
        </Row>

      </div>
    );
  }
}

export default Match;
