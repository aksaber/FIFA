import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel, Button, Icon} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import detailsPhoto from '../assets/img/detailsPhoto.png';
import '../style/plugin/base.css';
import '../style/plugin/glitch-slideshow.css';
import homeAdvertImg from '../assets/img/homeAdvert.png';

const stylesheet = {
  homeLeftImg: {
    height: 720,
    width: 1200,
    position: 'absolute',
    zIndex: 1,
    top: 90
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

class InfoAdvert extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    //每次更换不同id时重新渲染页面，如：informations?id=5 => informations?id=19
    if (this.props.location.search !== nextProps.location.search) {
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
    }
  }
  //获取文章详情的头部类别
  getNewsCategoryName = () => {
    const {home: {detailData}} = this.props;
    const list = [];
    detailData.newsCategoryName ? detailData.newsCategoryName.map(item => {
      list.push(<span>{item}</span>);
    }) : '';
    return list;
  };
  //点击title跳转对应文章详情
  gotoDetails = (customizeUrl) => {
    const {
      history,
      location: {pathname}
    } = this.props;
    //判断是资讯还是赛事
    if (pathname.indexOf('information') > -1) {
      history.push(`/details?majorKey=${customizeUrl}`);
    } else {
      history.push(`/matchDetails?majorKey=${customizeUrl}`);
    }
  };

  //渲染置顶的轮播图
  infoImg = () => {
    const {data, home: {isFixed}} = this.props;
    const list = [];
    data.length > 0 ? data.map((item, index) => {
      list.push(<div className={index === 0 ? 'slide slide--current' : 'slide'}>
        <div
          key={item.id}
          className="slide__img glitch"
          onClick={() => { window.open(item.jumpUrl); }}
          style={{backgroundImage: `url(${item.coverUrl})`, height: isFixed ? 810 : 720, cursor: 'pointer'}}
        />
        <div className="carouselTitle" style={{top: isFixed ? 252 : 162}}>
          <div>{item.categoryName}</div>
          <div
            style={stylesheet.title}
            className="title_2"
            onClick={() => this.gotoDetails(item.customizeUrl)}
          >{item.title}</div>
          <div className="title_3">{item.summary}</div>
          <div className="title_4 flex">
            <div className="titleFooter">
              {data.length === 3 ?
                <div
                  style={{cursor: 'pointer'}}
                  className="ellipsis"
                  onClick={() =>
                    this.gotoDetails(data[index === 2 ? 0 : 1 - index].customizeUrl)}
                >
                  {data[index === 2 ? 0 : 1 - index].title}
                </div> : ''}
            </div>
            <div className="titleFooter">
              {data.length === 3 ?
                <div
                  style={{cursor: 'pointer'}}
                  className="ellipsis"
                  onClick={() => this.gotoDetails(data[index === 2 ? 1 : 2].customizeUrl)}
                >
                  {data[index === 2 ? 1 : 2].title}
                </div> : ''}
            </div>
          </div>

        </div>
      </div>);
    }) : '';
    return list;
  };
  render() {
    const {
      data,
      home: {currentRoute, detailData, isFixed},
      type
    } = this.props;
    return (
      <div>
        {type === 'details' ?
          <div className="detailsSetTop">
            <div className="headerContent container" style={{position: 'unset', height: 430}}>
              <img
                src={data.coverUrl ? data.coverUrl : detailsPhoto}
                style={{
                  position: 'absolute',
                  opacity: 0.1,
                  top: 0,
                  left: '10%',
                  width: 1500,
                  height: isFixed ? 458 : 558
                }}
              />
              <div
                className="title_1"
                style={{display: data.newsCategoryName ? 'block' : 'none'}}
              >{this.getNewsCategoryName()}</div>
              <div className="title_2">{data.title}</div>
              <div className="title_3">{data.summary}</div>
            </div>
          </div>
          : <div className="demo-2" style={{height: isFixed ? 810 : 720}}>
            <img src={homeAdvertImg} style={stylesheet.homeLeftImg} />
            <div className="slides effect-2">
              {this.infoImg()}
            </div>
            <nav className="slide-nav" style={{top: 203}}>
              <button className="slide-nav__button"><span><Icon type="up" /></span></button>
              <button className="slide-nav__button"><span><Icon type="down" /></span></button>
            </nav>
          </div>}
      </div>
    );
  }
}

export default InfoAdvert;
