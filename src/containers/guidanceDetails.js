import React, {Component} from 'react';
import {Avatar, Row, Col, Tag, Input, message, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import axios from '../axios';
import InfoAdvert from '../components/infoAdvert';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class GuidanceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      content: '',
      data: ''
    };
  }

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('guidanceDetails');
    this.getDetail();
  }

  //获取新手入门详情
  getDetail = () => {
    const {getDetailData} = this.props;
    axios.get(`/news/about/findById?id=${this.state.urlParams.id}`).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          data: data.data,
          content: data.data.content
        }, () => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        });
        getDetailData(data.data);
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  formatSearch = (url) => {
    if (typeof url !== 'undefined') {
      url = url.substr(1);
      //把字符串分割为字符串数组
      const arr = url.split('&');
      let obj = {};
      const objAssign = {};
      let newarr = [];
      arr.forEach((item) => {
        newarr = item.split('=');
        obj = {[newarr[0]]: newarr[1]};
        Object.assign(objAssign, obj);
      });
      return objAssign;
    }
  };

  render() {
    const {content, data} = this.state;
    const {home: {screenW}} = this.props;
    return (
      <div>
        {screenW < 768 ? '' : <InfoAdvert data={data} location={this.props.location} type="details" />}
        <div className="detailDiv container">
          <div className="detailContent recoveryCss" dangerouslySetInnerHTML={{__html: content}} />
        </div>
      </div>
    );
  }
}

export default GuidanceDetails;
