import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, message} from 'antd';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import axios from '../axios';


@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Informations extends Component {
  state = {
    data: [],
    pageNo: 1,
    total: 0,
  };


  componentDidMount() {
    this.fetchData(this.state.pageNo);
  }

  fetchData = (pageNo) => {
    axios.post(
      '/news/newsList',
      {
        asc: true,
        map: {id: 1, type: 0},
        nowPage: pageNo,
        pageSize: 9,
        sort: 'string'
      }
    ).then((response) => {
      if (response.data.code === '0') {
        this.setState({data: response.data.data.records, total: response.data.data.total});
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  loadMore = async () => {
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post(
      '/news/newsList',
      {
        asc: true,
        map: {id: 1, type: 0},
        nowPage: this.state.pageNo,
        pageSize: 9,
        sort: 'string'
      }
    ).then((response) => {
      if (response.data.code === '0') {
        this.setState({data: this.state.data.concat(response.data.data.records)});
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }


  renderList = () => {
    const {data} = this.state;
    const list = [];
    data.map((item) => {
      list.push(<Col span={8} key={item.id}>
        <CommonCard data={item} history={this.props.history} />
      </Col>);
    });
    return list;
  }

  render() {
    const {data, total} = this.state;
    return (
      <div style={{padding: '60px 0 93px 0'}} className="container">
        <Row style={{marginBottom: 80}}>
          {this.renderList()}
        </Row>
        {data.length < total ?
          <div style={{textAlign: 'center'}}><button className="loadMoreBtn" onClick={this.loadMore}>加载更多</button></div>
          : <div style={{textAlign: 'center'}}><button className="loadMoreBtn" >没有更多</button></div>}
      </div>
    );
  }
}

export default Informations;
