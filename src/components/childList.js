import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

let infoSwiper = '';
let matchSwiper = '';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class childList extends Component {
  // componentDidUpdate(props) {
  //   const {data, type} = props;
  //   if (data.length > 0 && type === 0) {
  //     infoSwiper = new Swiper('.swiperHeader', {
  //       grabCursor: true,
  //       loop: true,
  //       nextButton: '.swiper-button-next',
  //       prevButton: '.swiper-button-prev',
  //       slidesPerView: 3,
  //       slidesPerGroup: 3,
  //       spaceBetween: 20,
  //       observer: true,
  //       observeParents: true,
  //     });
  //   } else if (data.length > 0 && type === 1) {
  //     matchSwiper = new Swiper('.swiperHeader', {
  //       grabCursor: true,
  //       loop: true,
  //       nextButton: '.swiper-button-next',
  //       prevButton: '.swiper-button-prev',
  //       slidesPerView: 3,
  //       slidesPerGroup: 3,
  //       spaceBetween: 20,
  //       observer: true,
  //       observeParents: true,
  //     });
  //   }
  // }
  componentDidMount() {
    const {type} = this.props;
    if (type === 0) {
      infoSwiper = new Swiper(this.refs.infoSwiper, {
        init: false,
        grabCursor: true,
        nextButton: this.refs.infoNext,
        prevButton: this.refs.infoPrev,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
        observer: true,
        observeParents: true
      });
      setTimeout(() => {
        infoSwiper.init();
      }, 1000);
    } else if (type === 1) {
      matchSwiper = new Swiper(this.refs.matchSwiper, {
        init: false,
        grabCursor: true,
        nextButton: this.refs.matchNext,
        prevButton: this.refs.matchPrev,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
        observer: true,
        observeParents: true
      });
      setTimeout(() => {
        matchSwiper.init();
      }, 1000);
    }
  }

  gotoDetail = (type, id) => {
    //跳转到相应资讯/赛事列表
    const {history, changeRoute} = this.props;
    if (type === 0) {
      changeRoute('informations');
      history.push(`/informations?id=${id}`);
    } else {
      changeRoute('match');
      history.push(`/match?id=${id}`);
    }
  };

  render() {
    const ulStyle = {
      height: '200px',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.8)',
      padding: '17px 10%',
      position: 'absolute',
      top: '70px',
      left: 0,
      zIndex: 99999
    };
    const {type} = this.props;
    const renderList = () => {
      const {data} = this.props;
      const list = [];
      data.map((item) => {
        list.push(<div
          className="swiper-slide"
          onClick={() => this.gotoDetail(type, item.id)}
          key={item.id}
        >
          <li>
            <img src={item.coverUrl} width={320} height={130} style={{'margin-bottom': '11px'}} />
            <div>{item.name}</div>
          </li></div>);
      });
      return list;
    };

    return (
      <ul
        style={ulStyle}
        className={this.props.isShow ? 'show' : 'hidden'}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div className="swiperHeader" ref={type === 0 ? 'infoSwiper' : 'matchSwiper'}>
          <div className="swiper-wrapper">{renderList()}</div>
          <div className="swiper-button-prev" ref={type === 0 ? 'infoPrev' : 'matchPrev'} />
          <div className="swiper-button-next" ref={type === 0 ? 'infoNext' : 'matchNext'} />
          {/*<div className="swiperNextDiv">*/}
          {/*<div className="swiper-button-next" />*/}
          {/*</div>*/}
        </div>
      </ul>
    );
  }
}

export default childList;
