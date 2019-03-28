import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, message} from 'antd';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import urlConfig from '../config';
import axios from '../axios';


@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Informations extends Component {
  state = {
    data: []
  };


  componentDidMount() {
    console.log(urlConfig, 'aaaaaaaaaaaaaaaaaaaa');
    axios.post(
      '/news/newsList',
      {
        asc: true,
        map: {id: 1, type: 0},
        nowPage: 1,
        pageSize: 9,
        sort: 'string'
      }
    ).then((response) => {
      if (response.data.code === '0') {
        this.setState({data: response.data.data.records});
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(err);
    });
  }

  renderList = () => {
    const {data} = this.state;
    const list = [];
    data.map((item) => {
      list.push(<Col span={8} key={item.id}><CommonCard data={item} history={this.props.history} /></Col>);
    });
    return list;
  }

  render() {
    return (
      <div>
        <Row>
          {this.renderList()}

        </Row>

      </div>
    );
  }
}

export default Informations;
