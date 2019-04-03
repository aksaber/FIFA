import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, message} from 'antd';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import urlConfig from '../config';
import axios from '../axios';
import '../style/home/home.scss';
import homeCrossband from '../assets/img/homeCrossband.png';

const stylesheet = {
  title: {
    color: 'rgb(26, 71, 176)',
    fontSize: 46,
    marginTop: -37,
    padding: '0px 10px'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Home extends Component {
  state = {
    data: [],
    pageNo: 1,
    total: 0
  };

  componentDidMount() {
    axios.post('/news/newsList', {
      asc: true,
      map: {
        id: 1,
        type: 0
      },
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          data: res.data.data.records,
          total: res.data.data.total
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

  //热门资讯加载更多
  loadMore = async () => {
    //setState异步
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post('/news/newsList', {
      asc: true,
      map: {
        id: 1,
        type: 0
      },
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          data: this.state.data.concat(res.data.data.records)
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //热门资讯查看更多
  findMore = () => {
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/informations');
  };

  render() {
    const {data, total} = this.state;
    return (
      <div className="homes">
        <div className="container">
          <div className="flex" style={{marginBottom: 29}}>
            <div className="dashedLine flex_1" />
            <div style={stylesheet.title}>热门资讯</div>
            <div className="dashedLine flex_1" />
          </div>
          <Row>{data.map((item) =>
            (<Col span={8} key={item.id}>
              <CommonCard data={item} />
            </Col>))}
          </Row>
          <div style={{textAlign: 'center', marginTop: 50}}>{(data.length < 18 && total > 18) ?
            <button className="loadMoreBtn" onClick={this.loadMore}>加载更多</button>
            : <button className="loadMoreBtn" onClick={this.findMore}>查看更多</button>}</div>
        </div>
        <img src={homeCrossband} style={{width: '100%', margin: '70px 0 109px 0'}} />
        <div className="container">
          <div className="flex" style={{marginBottom: 49}}>
            <div className="dashedLine flex_1" />
            <div style={stylesheet.title}>电竞赛事</div>
            <div className="dashedLine flex_1" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
