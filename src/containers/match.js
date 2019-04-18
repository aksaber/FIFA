import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
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
class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      data: [],
      pageNo: 1,
      total: 0,
    };
  }

  componentDidMount() {
    const {urlParams, pageNo} = this.state;
    this.fetchData(pageNo, parseInt(urlParams.id, 10));
  }

  componentWillReceiveProps(nextProps) {
    //每次更换不同id时重新渲染页面，如：match?id=5 => match?id=19
    this.setState({
      urlParams: this.formatSearch(nextProps.location.search)
    }, () => {
      this.fetchData(this.state.pageNo, parseInt(this.state.urlParams.id, 10));
    });
  }

  fetchData = (pageNo, urlId) => {
    axios.post('/news/newsList', {
      asc: true,
      map: {id: urlId, type: 1},
      nowPage: pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          data: res.data.data.records,
          total: res.data.data.total
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  loadMore = async () => {
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post('/news/newsList', {
      asc: true,
      map: {id: parseInt(this.state.urlParams.id, 10), type: 1},
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({data: this.state.data.concat(res.data.data.records)});
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  formatSearch = (url) => {
    if (typeof url !== 'undefined') {
      url = url.substr(1);
      //把字符串分割为字符串数组
      const arr = url.split('&');
      let obj = {};
      const objAssign = {};
      let newarr = [];
      arr.forEach((item) => {
        newarr = item.split('=');
        obj = {[newarr[0]]: newarr[1]};
        Object.assign(objAssign, obj);
      });
      return objAssign;
    }
  };

  renderList = () => {
    const {data} = this.state;
    const list = [];
    data.map((item) => {
      list.push(<Col span={8} key={item.id}>
        <CommonCard data={item} history={this.props.history} location="matchDetails" />
      </Col>);
    });
    return list;
  };

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

export default Match;
