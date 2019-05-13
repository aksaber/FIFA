import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Col, message, Row} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import CommonCard from '../components/CommonCard';

const styleSheet = {
  title: {
    borderTop: '1px solid #D6DDF0',
    borderBottom: '1px solid #D6DDF0',
    color: '#1A47B0',
    fontSize: 20,
    padding: '25px 0',
    margin: '51px 20px 42px'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Search extends Component {
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
    const {urlParams} = this.state;
    this.fetchData(decodeURI(urlParams.content));
  }

  componentWillReceiveProps(nextProps) {
    //当搜索关键字改变时更新搜索条件并重新搜索
    const {location: {search}} = this.props;
    if (search !== nextProps.location.search) {
      this.setState({
        urlParams: this.formatSearch(nextProps.location.search),
        pageNo: 1
      }, () => {
        this.fetchData(decodeURI(this.state.urlParams.content));
      });
    }
  }

  fetchData = (content) => {
    axios.post('/news/news/totalQuery', {
      asc: true,
      map: {title: content},
      nowPage: this.state.pageNo,
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
      list.push(<Col span={8} key={item.id}>
        <CommonCard data={item} history={this.props.history} location="details" />
      </Col>);
    });
    return list;
  };

  loadMore = async () => {
    const {urlParams} = this.state;
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post(
      '/news/news/totalQuery',
      {
        asc: true,
        map: {title: decodeURI(urlParams.content)},
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
    const {total, data, urlParams} = this.state;
    return (
      <div className="container" style={{marginBottom: 93}}>
        <div style={styleSheet.title}>
          <span
            style={{display: urlParams.content === '' ? 'none' : 'inline'}}
          >关键词<span> {decodeURI(urlParams.content)} </span>的搜索结果，共<span> {total} </span>条结果</span>
          <span
            style={{display: urlParams.content === '' ? 'inline' : 'none'}}
          >搜索结果共<span> {total} </span>条结果</span>
        </div>
        <Row style={{marginBottom: 80}}>{this.renderList()}</Row>
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

export default Search;
