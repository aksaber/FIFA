import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Carousel, Button} from 'antd';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import detailsPhoto from '../assets/img/detailsPhoto.png';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class InfoAdvert extends Component {
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
      changeRoute,
      location: {pathname}
    } = this.props;
    changeRoute('details');
    //判断是资讯还是赛事
    if (pathname.indexOf('information') > -1) {
      history.push(`/details?id=${customizeUrl}&state=${customizeUrl}&majorKey=${customizeUrl}`);
    } else {
      history.push(`/matchDetails
      ?id=${customizeUrl}
      &state=${customizeUrl}
      &majorKey=${customizeUrl}`);
    }
  };
  render() {
    const {
      data,
      home: {currentRoute, detailData, isFixed}
    } = this.props;
    return (
      <div>
        {/*<div*/}
        {/*className="container"*/}
        {/*style={{*/}
        {/*marginBottom: '31px',*/}
        {/*display: (currentRoute.indexOf('details') > -1*/}
        {/*|| currentRoute.indexOf('Details') > -1*/}
        {/*|| data.length <= 0)*/}
        {/*? 'none' : 'block'*/}
        {/*}}*/}
        {/*>*/}
        {/*<span className="headerLine" style={{background: '#fff', width: '113px'}} />*/}
        {/*<span className="headerLine" style={{background: '#709BE7', width: '67px'}} />*/}
        {/*</div>*/}
        {(currentRoute.indexOf('details') <= -1
          && currentRoute.indexOf('Details') <= -1)
          ? <Carousel
            vertical
            className="headerContent headerContent2 container"
            autoplay
            dotPosition="left"
          >
            {data.length > 1 ? data.map((item, index) => (
              <div key={item.id} className="carouselHeight">
                <div
                  className="title_2"
                  onClick={() => this.gotoDetails(item.customizeUrl)}
                >{item.title}</div>
                <div className="title_3">{item.summary}</div>
                <div className="title_4 flex">
                  <div className="titleFooter">
                    {data.length === 3 ?
                      <div
                        style={{cursor: 'pointer'}}
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
                        onClick={() => this.gotoDetails(data[index === 2 ? 1 : 2].customizeUrl)}
                      >
                        {data[index === 2 ? 1 : 2].title}
                      </div> : ''}
                  </div>
                </div>
              </div>
            )) : ''}
          </Carousel>
          : <div className="headerContent container" style={{position: 'unset', height: 369}}>
            <img
              src={detailData.coverUrl ? detailData.coverUrl : detailsPhoto}
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
              style={{display: detailData.newsCategoryName ? 'block' : 'none'}}
            >{this.getNewsCategoryName()}</div>
            <div className="title_2">{detailData.title}</div>
            <div className="title_3">{detailData.summary}</div>
          </div>}
      </div>
    );
  }
}

export default InfoAdvert;
