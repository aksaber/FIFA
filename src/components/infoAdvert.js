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

class InfoAdvert extends Component {
  render() {
    const {data} = this.props;
    return (
      <Carousel vertical className="headerContent container" autoplay>
        {data.map((item, index) => (
          <div key={item.id}>
            {/*<div className="title_1">FIFA</div>*/}
            <div className="title_2">{item.title}</div>
            <div className="title_3">{item.summary}</div>
            <div className="title_4 flex">
              <div className="titleFooter">
                <div>{data[index === 2 ? 0 : 1 - index].title}</div>
              </div>
              <div className="titleFooter">
                <div>{data[index === 2 ? 1 : 2].title}</div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default InfoAdvert;
