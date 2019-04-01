import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, Tag, Input, Button, message} from 'antd';
import sina from '~/assets/img/sina.svg';
import wechat from '~/assets/img/wechat.svg';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import MultiComment from '../components/MultiComment';
import axios from '../axios';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Details extends Component {
  state = {
    tagArray: [],
    comment: '',
    content: '',
  };


  componentDidMount() {
    console.log(this.props);
    axios.get(`/news/findById${this.props.location.search}&type=0`).then((response) => {
      const {data} = response;
      console.log(data);
      if (data.code === '0') {
        this.setState({tagArray: data.data.tags, content: data.data.info.content});
        // , content: data.data.info.content
      } else {
        message.warning(response.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  }


  render() {
    const {tagArray, comment, content} = this.state;
    const {TextArea} = Input;
    return (
      <div>
        <div dangerouslySetInnerHTML={{
          __html: content
        }}
        />
        <div className="dashedLine" />
        <div className="flex_1">
          <div className="flex_1">
            {tagArray.map((item) => <Tag color="#1A47B0" key={item.id}>{item.name}</Tag>)}
          </div>
          <div className="flex_1" style={{'text-align': 'right'}}>
            <img src={sina} width={20} height={16} style={{'margin-right': '30px'}} />
            <img src={wechat} width={20} height={16} style={{'margin-right': '30px'}} />
          </div>
        </div>
        <div className="flex">
          <div className="dashedLine flex" style={{width: '45%'}} />
          <p className="flex" style={{display: 'inline-block'}}>留言</p>
          <div className="dashedLine flex" style={{width: '45%'}} />
        </div>
        <div>
          <div>
            <Avatar />
            <TextArea rows={4} defaultValue="发布您的留言" />
          </div>
          <div>
            <img src={wechat} width={20} height={16} style={{'margin-right': '30px'}} />
            <Button type="primary">发布</Button>
          </div>
        </div>
        <div>
          <MultiComment>
            <MultiComment>
              <MultiComment />
              <MultiComment />
            </MultiComment>
          </MultiComment>
        </div>
      </div>
    );
  }
}

export default Details;
