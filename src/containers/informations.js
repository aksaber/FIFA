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
class Informations extends Component {
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
      <Row gutter={32}>
        <Col span={6}><CommonCard data={data[0]} /></Col>
        <Col span={6}><CommonCard data={data[1]} /></Col>
        <Col xpan={6}><CommonCard data={data[2]} /></Col>
      </Row>
    );
  }
}

export default Informations;
