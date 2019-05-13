import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel} from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import homeAdvertImg from '../assets/img/homeAdvert.png';

const stylesheet = {
  homeLeftImg: {
    height: 720,
    width: 800,
    position: 'absolute',
    zIndex: 1,
    top: -130
  },
  swiperMask: {
    width: '100%',
    background: 'linear-gradient(90deg, #000, transparent)',
    opacity: 0.3,
    height: 800,
    position: 'absolute'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeAdvert extends Component {
  componentDidMount() {
    this.swiper = new Swiper('.swiperHome', {
      observer: true,
      observeParents: true,
      autoplay: 3000,
      onSlideChangeStart(swiper) {
      },
    });
    this.swiper2 = new Swiper('.swiperHomeImg', {
      effect: 'fade',
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
    });
    this.swiper.params.control = this.swiper2;
  }

  //渲染轮播图
  swiperAdvert = () => {
    const {data} = this.props;
    const list = [];
    data.map((item) => {
      list.push(<div
        className="swiper-slide"
        key={item.id}
        onClick={() => this.jumpOut(item.jumpUrl)}
      >
        <li>
          <div className="title_2">{item.title}</div>
        </li></div>);
    });
    return list;
  };

  //渲染图片轮播图
  swiperImg = () => {
    const {data} = this.props;
    const list = [];
    data.map((item) => {
      list.push(<div
        className="swiper-slide"
        key={item.id}
        onClick={() => this.jumpOut(item.jumpUrl)}
      >
        <img className="homeImg" src={item.pictureUrl} />
        <div style={stylesheet.swiperMask} />
      </div>);
    });
    return list;
  };

  //首页广告轮播图跳转链接
  jumpOut = (url) => {
    window.open(url);
  };

  render() {
    const {data, home: {isFixed}} = this.props;
    return (
      <div style={{padding: '40px 0', height: isFixed ? 590 : 500}}>
        <img src={homeAdvertImg} style={stylesheet.homeLeftImg} />
        <div className="swiperHomeImg swiper-no-swiping">
          <div className="swiper-wrapper">{this.swiperImg()}</div>
        </div>
        <div
          className="headerContent container swiperHome"
          style={{marginTop: isFixed ? 190 : 100}}
        >
          <div className="swiper-wrapper">{this.swiperAdvert()}</div>
        </div>
      </div>
    );
  }
}

export default HomeAdvert;
