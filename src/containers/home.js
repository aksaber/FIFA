import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, message} from 'antd';
import {bindActionCreators} from 'redux';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import HomeMatchs from '../components/HomeMatchs';
import HomeAdvert from '../components/homeAdvert';
import axios from '../axios';
import '../style/home/home.scss';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Home extends Component {
  state = {
    data: [],
    pageNo: 1,
    total: 0,
    guidance: [],
    matchData: [],
    advert: {},
    homeList: []
  };

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('home');
    //中间广告图
    axios.get('/news/news/firstNews').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({advert: data.data.adMid});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //首页置顶广告
    axios.get('/news/news/firstNews').then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({homeList: data.data.firstNews});
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //首页热门资讯
    axios.post('/news/news/newsList', {
      asc: true,
      map: {
        type: 0
      },
      nowPage: this.state.pageNo,
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

    //首页电竞赛事
    axios.get('/news/news/firstEvent').then((res) => {
      if (res.data.code === '0') {
        this.setState({
          matchData: res.data.data,
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });

    //首页新手入门
    axios.get('/news/about/getGuidance').then((res) => {
      const {home: {screenW}} = this.props;
      if (res.data.code === '0') {
        this.setState({guidance: res.data.data}, () => {
          if (screenW < 768) {
            this.swiper = new Swiper('.swiperGuidance', {});
          } else {
            this.swiper = new Swiper('.swiperGuidance', {
              slidesPerView: 3,
              slidesPerGroup: 3,
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev'
            });
          }
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  //热门资讯加载更多
  loadMore = async () => {
    //setState异步
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post('/news/news/newsList', {
      asc: true,
      map: {
        type: 0
      },
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          data: this.state.data.concat(res.data.data.records)
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //热门资讯查看更多
  findMore = () => {
    const {history} = this.props;
    history.push('/informations');
  };

  //新手入门轮播
  guidanceList = () => {
    const {guidance} = this.state;
    const list = [];
    guidance.map((item) => {
      list.push(<div className="swiper-slide">
        <CommonCard data={item} history={this.props.history} location="guidanceDetails" />
      </div>);
    });
    return list;
  };

  //广告图跳转
  jumpUrl = (url) => {
    window.open(url, '_blank');
  };

  render() {
    const {
      data,
      total,
      matchData,
      advert,
      homeList
    } = this.state;
    const {home: {screenW}} = this.props;
    return (
      <div className="homes">
        <HomeAdvert data={homeList} />
        <div className="container" style={{marginTop: 60}}>
          <div className="flex">
            <div className="dashedLine flex_1" />
            <div className="homeTitle">热门资讯</div>
            <div className="dashedLine flex_1" />
          </div>
          <Row>{data.map((item) =>
            (<Col md={12} xl={8} key={item.id}>
              <CommonCard data={item} history={this.props.history} location="details" />
            </Col>))}
          </Row>
          <div style={{textAlign: 'center', marginTop: 50}}>{(data.length < 18 && total > 18) ?
            <button className="loadMoreBtn" onClick={this.loadMore}>加载更多</button>
            : <button className="loadMoreBtn" onClick={this.findMore}>查看更多</button>}</div>
        </div>
        <div
          onClick={() => { window.open(advert.jumpUrl); }}
          style={{margin: '70px 0 109px 0'}}
        >
          <img src={advert.pictureUrl} style={{width: '100%', height: 'auto', cursor: 'pointer'}} />
        </div>
        <div className="container">
          <div className="flex" style={{marginBottom: 49}}>
            <div className="dashedLine flex_1" />
            <div className="homeTitle">电竞赛事</div>
            <div className="dashedLine flex_1" />
          </div>
          <Row>{matchData ? matchData.map((item) =>
            (<Col md={12} key={item.id}>
              <HomeMatchs data={item} history={this.props.history} />
            </Col>)) : ''}
          </Row>
        </div>
        <div style={{background: '#F7F8FB', padding: '76px 0 187px 0', position: 'relative'}}>
          <div className="flex container" style={{marginBottom: 49}}>
            <div className="dashedLine flex_1" />
            <div className="homeTitle">新手入门</div>
            <div className="dashedLine flex_1" />
          </div>
          <div className="swiper-container swiperGuidance">
            <div className="swiper-wrapper">{this.guidanceList()}</div>
          </div>
          <div className="swiper-button-prev" style={{display: screenW < 768 ? 'none' : 'block'}} />
          <div className="swiper-button-next" style={{display: screenW < 768 ? 'none' : 'block'}} />
        </div>
      </div>
    );
  }
}

export default Home;
