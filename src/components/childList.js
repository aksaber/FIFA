import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class childList extends Component {
  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (data.length > 0) {
      this.swiper = new Swiper('.swiperHeader', {
        loop: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 4
      });
    }
  }

  renderList = () => {
    const {data, type} = this.props;
    const list = [];
    data.map((item) => {
      list.push(<div onClick={() => this.gotoDetail(type, item.id)} key={item.id}><li className="swiper-slide">
        <img src={item.coverUrl} width={320} height={130} style={{'margin-bottom': '11px'}} />
        <div>{item.name}</div>
      </li></div>);
    });
    return list;
  };

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
      background: '#fff',
      padding: '17px 10%',
      position: 'absolute',
      top: '70px',
      left: 0,
      zIndex: 1
    };

    return (
      <ul
        style={ulStyle}
        className={this.props.isShow ? 'show' : 'hidden'}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div className="swiperHeader">
          <div className="swiper-wrapper">{this.renderList()}</div>
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
          {/*<div className="swiperNextDiv">*/}
          {/*<div className="swiper-button-next" />*/}
          {/*</div>*/}
        </div>
      </ul>
    );
  }
}

export default childList;
