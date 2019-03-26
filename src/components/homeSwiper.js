import React, {Component} from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeSwiper extends Component {
  componentDidMount() {
    const mySwiper = new Swiper('.swiper-container', {
      init: false,
      autoplay: 3000,
      loop: true,
    });
    mySwiper.init();
  }

  render() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">Slide 1</div>
          <div className="swiper-slide">Slide 2</div>
          <div className="swiper-slide">Slide 3</div>
        </div>
        <div className="swiper-pagination" />
      </div>
    );
  }
}

export default HomeSwiper;
