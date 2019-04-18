import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeAdvert extends Component {
  render() {
    const {data} = this.props;
    return (
      <div style={{padding: '40px 0'}}>
        <Carousel vertical className="headerContent container" autoplay>
          {data.map((item, index) => (
            <div key={item.id}>
              <div className="title_2">{item.title}</div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default HomeAdvert;
