import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, message, Row} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import CommonCard from '../components/CommonCard';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      total: 0,
      data: [],
      pageNo: 1
    };
  }

  componentDidMount() {
    const {urlParams, pageNo} = this.state;
    const {changeRoute} = this.props;
    changeRoute('tagList');
    this.fetchData(pageNo, parseInt(urlParams.id, 10));
  }

  fetchData = (pageNo, tagId) => {
    axios.post('/news/news/tagList', {
      asc: true,
      map: {id: tagId},
      nowPage: pageNo,
      pageSize: 15,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({data: res.data.data.records, total: res.data.data.total});
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  renderList = () => {
    const {data} = this.state;
    const list = [];
    data.map((item) => {
      list.push(<Col xl={8} md={24} key={item.id}>
        <CommonCard data={item} history={this.props.history} location="details" />
      </Col>);
    });
    return list;
  };

  loadMore = async () => {
    const {urlParams} = this.state;
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post(
      '/news/news/tagList',
      {
        asc: true,
        map: {id: parseInt(urlParams.id, 10)},
        nowPage: this.state.pageNo,
        pageSize: 15,
        sort: 'string'
      }
    ).then((res) => {
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

  render() {
    const {total, data} = this.state;
    const {home: {screenW}} = this.props;
    return (
      <div className="container" style={{marginBottom: 93}}>
        <Row
          style={{marginBottom: 80, marginTop: screenW < 768 ? 60 : ''}}
        >{this.renderList()}</Row>
        {data.length < total ?
          <div style={{textAlign: 'center'}}>
            <button className="loadMoreBtn" onClick={this.loadMore}>加载更多</button>
          </div>
          : <div style={{textAlign: 'center'}}>
            <button className="loadMoreBtn" >没有更多</button>
          </div>}
      </div>
    );
  }
}

export default TagList;
