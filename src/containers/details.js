import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, Tag, Input, Button, message, Icon} from 'antd';
import sina from '~/assets/img/sina-blue.svg';
import wechat from '~/assets/img/wechat-blue.svg';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import MultiComment from '../components/MultiComment';
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
class Details extends Component {
  state = {
    tagArray: [],
    comment: '',
    content: '',
    tagInfo: []
  };


  componentDidMount() {
    axios.get(`/news/findById${this.props.location.search}&type=0`).then((response) => {
      const {data} = response;
      console.log(data);
      if (data.code === '0') {
        this.setState({
          tagArray: data.data.tags,
          content: data.data.info.content,
          tagInfo: data.data.tagInfo
        });
        // , content: data.data.info.content
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }


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
            {tagArray.map((item) => <Tag className="tagColor" key={item.id}>{item.name}</Tag>)}
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
        <div style={{marginBottom: 129}}>
          <MultiComment>
            <MultiComment>
              <MultiComment />
              <MultiComment />
            </MultiComment>
          </MultiComment>
        </div>
        <div className="flex" style={{marginBottom: 38}}>
          <div className="dashedLine flex_1" />
          <div style={stylesheet.words}>不能错过的内容</div>
          <div className="dashedLine flex_1" />
        </div>
        <div>
          <Row>{tagInfo.map((item) => <Col span={8} key={item.id}><CommonCard data={item} history={this.props.history} /></Col>)}</Row>
        </div>
      </div>
    );
  }
}

export default Details;
