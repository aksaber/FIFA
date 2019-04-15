import React, {Component} from 'react';
import {Avatar, Row, Col, Tag, Input, message, Icon} from 'antd';
import sina from '~/assets/img/sina-blue.svg';
import wechat from '~/assets/img/wechat-blue.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import axios from '../axios';

const stylesheet = {
  words: {
    color: 'rgb(26, 71, 176)',
    fontSize: 46,
    marginTop: -37,
    padding: '0px 10px'
  },
  avater: {
    position: 'absolute',
    zIndex: 1,
    top: 34,
    left: 20
  },
  textarea: {
    padding: '51px 20px 20px 95px',
    borderRadius: 0,
    resize: 'none'
  },
  btn: {
    fontSize: 16,
    padding: '12px 31px',
    fontWeight: 'bold',
    background: '#0065E0',
    border: '1px solid transparent',
    color: '#fff'
  },
  textFooter: {
    border: '1px solid #d9d9d9',
    padding: '9px 30px',
    borderTop: 'none',
    textAlign: 'right'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MatchDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: this.formatSearch(props.location.search),
      tagArray: [],
      comment: '',
      content: '',
      tagInfo: []
    };
  }

  componentDidMount() {
    axios.get(`/news/findById?id=${this.state.urlParams.id}&type=1`).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          tagArray: data.data.tags,
          content: data.data.info.content,
          tagInfo: data.data.tagInfo
        });
        // , content: data.data.info.content
      } else {
        message.warning(data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }

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
    const {
      tagArray,
      tagInfo,
      comment,
      content
    } = this.state;
    const {TextArea} = Input;
    return (
      <div className="detailDiv container">
        <div className="detailContent" dangerouslySetInnerHTML={{__html: content}} />
        <div className="dashedLine" />
        <div className="flex" style={{padding: '28px 0 68px 0'}}>
          <div className="flex_1">
            {tagArray ? tagArray.map((item) => <Tag className="tagColor" key={item.id}>{item.name}</Tag>) : ''}
          </div>
          <div className="flex_1" style={{'text-align': 'right', margin: 'auto'}}>
            <img src={sina} width={29} height={24} style={{'margin-right': '30px'}} />
            <img src={wechat} width={29} height={24} />
          </div>
        </div>
        <div className="flex" style={{marginBottom: 83}}>
          <div className="dashedLine flex_1" />
          <div style={stylesheet.words}>评论</div>
          <div className="dashedLine flex_1" />
        </div>
        <div style={{marginBottom: 80}}>
          <div style={{position: 'relative'}}>
            <Avatar size={48} icon="user" style={stylesheet.avater} />
            <TextArea rows={3} placeholder="发布您的留言" style={stylesheet.textarea} />
          </div>
          <div style={stylesheet.textFooter}>
            <Icon type="smile" style={{fontSize: 20, marginRight: 41}} />
            <button style={stylesheet.btn}>发布</button>
          </div>
        </div>
        <div className="flex" style={{marginBottom: 38}}>
          <div className="dashedLine flex_1" />
          <div style={stylesheet.words}>不能错过的内容</div>
          <div className="dashedLine flex_1" />
        </div>
        <div>
          <Row>{tagInfo ? tagInfo.map((item) => <Col span={8} key={item.id}><CommonCard data={item} history={this.props.history} /></Col>) : ''}</Row>
        </div>
      </div>
    );
  }
}

export default MatchDetails;
