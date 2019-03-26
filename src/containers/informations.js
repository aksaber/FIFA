import React, {Component} from 'react';
import {List, Card, Avatar} from 'antd';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

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
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <Card title="卡片标题">{item.title}</Card>
        )}
      />
    );
  }
}

export default Informations;
