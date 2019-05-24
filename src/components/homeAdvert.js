import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'antd';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import homeAdvertImg from '../assets/img/homeAdvert.png';
import '../style/plugin/base.css';
import '../style/plugin/glitch-slideshow.css';

const stylesheet = {
  homeLeftImg: {
    height: 720,
    width: 1200,
    position: 'absolute',
    zIndex: 1,
    top: 90
  },
  swiperMask: {
    width: '100%',
    background: 'linear-gradient(90deg, #000, transparent)',
    opacity: 0.3,
    height: 800,
    position: 'absolute'
  },
  title: {
    fontSize: '60px',
    fontWeight: 'bold'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeAdvert extends Component {
  componentDidMount() {
    setTimeout(() => {
      document.documentElement.className = 'js';
      const supportsCssVars = function () {
        let e = document.createElement('style');
        const t = document.createElement('style');
        return (t.innerHTML = 'root: { --tmp-var: bold; }',
        document.head.appendChild(t),
        e = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)')),
        t.parentNode.removeChild(t),
        e);
      };
      supportsCssVars() || alert('Please view this demo in a modern browser that supports CSS Variables.');
      //加载js
      const script = document.createElement('script');
      script.src = 'http://192.168.1.115:8086/demo2.js';
      document.body.appendChild(script);
    }, 1000);
    // this.swiper = new Swiper('.swiperHome', {
    //   observer: true,
    //   observeParents: true,
    //   autoplay: 3000,
    //   onSlideChangeStart(swiper) {
    //   },
    // });
    // this.swiper2 = new Swiper('.swiperHomeImg', {
    //   effect: 'fade',
    //   observer: true,
    //   observeParents: true,
    //   watchSlidesProgress: true,
    // });
    // this.swiper.params.control = this.swiper2;
  }

  //渲染轮播图
  // swiperAdvert = () => {
  //   const {data} = this.props;
  //   const list = [];
  //   data.map((item) => {
  //     list.push(<div
  //       className="swiper-slide"
  //       key={item.id}
  //       onClick={() => this.jumpOut(item.jumpUrl)}
  //     >
  //       <li>
  //         <div className="title_2">{item.title}</div>
  //       </li></div>);
  //   });
  //   return list;
  // };
  //
  // //渲染图片轮播图
  // swiperImg = () => {
  //   const {data} = this.props;
  //   const list = [];
  //   data.map((item) => {
  //     list.push(<div
  //       className="swiper-slide"
  //       key={item.id}
  //       onClick={() => this.jumpOut(item.jumpUrl)}
  //     >
  //       <img className="homeImg" src={item.pictureUrl} />
  //       <div style={stylesheet.swiperMask} />
  //     </div>);
  //   });
  //   return list;
  // };

  homeImg = () => {
    const {data, home: {isFixed}} = this.props;
    const list = [];
    data.map((item, index) => {
      list.push(<div className={index === 0 ? 'slide slide--current' : 'slide'}>
        <div
          key={item.id}
          className="slide__img glitch"
          onClick={() => { window.open(item.jumpUrl); }}
          style={{backgroundImage: `url(${item.pictureUrl})`, height: isFixed ? 810 : 720, cursor: 'pointer'}}
        />
        <div className="carouselTitle" style={{top: isFixed ? 352 : 262}}>
          <p style={stylesheet.title}>{item.title}</p>
        </div>
      </div>);
    });
    return list;
  };

  render() {
    const {data, home: {isFixed}} = this.props;
    return (
      <div className="demo-2" style={{height: isFixed ? 810 : 720}}>
        <img src={homeAdvertImg} style={stylesheet.homeLeftImg} />
        <div className="">
          <div className="slides effect-2">
            {this.homeImg()}
          </div>
          <nav className="slide-nav">
            <button className="slide-nav__button"><span><Icon type="up" /></span></button>
            <button className="slide-nav__button"><span><Icon type="down" /></span></button>
          </nav>
        </div>
      </div>
    );
  }
}

export default HomeAdvert;
