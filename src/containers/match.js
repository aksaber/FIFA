import React, {Component} from 'react';
import {Row, Col, message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swiper from 'swiper';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import axios from '../axios';
import MobileAdvert from '../components/mobile-advert';

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
      matchAdvert: []
    };
  }

  componentDidMount() {
    const {urlParams, pageNo} = this.state;
    const {changeRoute, home: {screenW}} = this.props;
    changeRoute('match');
    this.fetchData(pageNo, parseInt(urlParams.id, 10));
    //获取置顶轮播
    if (screenW < 768) {
      this.getInfoSetTop();
    }
  }

  componentWillReceiveProps(nextProps) {
    //每次更换不同id时重新渲染页面，如：match?id=5 => match?id=19
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        urlParams: this.formatSearch(nextProps.location.search)
      }, () => {
        this.fetchData(this.state.pageNo, parseInt(this.state.urlParams.id, 10));
        if (nextProps.home.screenW < 768) {
          this.getInfoSetTop();
        }
      });
    }
  }

  //FIFA资讯置顶轮播
  getInfoSetTop = () => {
    axios.get(`/news/news/newsTopList?type=1&typeId=${this.state.urlParams.id}`).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({matchAdvert: data.data}, () => {
          this.swiper = new Swiper('.matchSwiper', {
            pagination: '.swiper-pagination'
          });
        });
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  matchSetTopList = () => {
    const {matchAdvert} = this.state;
    const list = [];
    matchAdvert.map((item) => {
      list.push(<div className="swiper-slide">
        <MobileAdvert data={item} history={this.props.history} location="details" />
      </div>);
    });
    return list;
  };

  fetchData = (pageNo, urlId) => {
    axios.post('/news/news/newsList', {
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
    axios.post('/news/news/newsList', {
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
      list.push(<Col md={12} xl={8} key={item.id}>
        <CommonCard data={item} history={this.props.history} location="matchDetails" />
      </Col>);
    });
    return list;
  };

  render() {
    const {data, total} = this.state;
    const {home: {screenW}} = this.props;
    return (
      <div style={{padding: '60px 0 93px 0'}} className="container">
        {screenW < 768 ? <div className="swiper-container matchSwiper">
          <div className="swiper-wrapper">{this.matchSetTopList()}</div>
          <div className="swiper-pagination" />
        </div> : ''}
        <Row style={{marginBottom: 80}}>
          {this.renderList()}
        </Row>
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

export default Match;
