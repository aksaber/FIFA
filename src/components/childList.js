import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swiper from 'swiper/dist/js/swiper.js';
import * as homeActions from '../redux/reduces/home';
import defaultPhoto from '../assets/img/defaultPhoto.png';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class childList extends Component {
  componentDidMount() {
    this.swiper = new Swiper('.swiperHeader', {
      loop: false,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 4
    });
  }

  renderList = () => {
    const {data} = this.props;
    const list = [];
    data.map((item) => {
      list.push(<li className="swiper-slide">
        <img src={defaultPhoto} width={320} height={130} style={{'margin-bottom': '11px'}} />
        <div>{item.name}</div>
      </li>);
    });
    return list;
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
          <div className="swiperNextDiv">
            <div className="swiper-button-next" />
          </div>
        </div>
      </ul>
    );
  }
}

export default childList;
