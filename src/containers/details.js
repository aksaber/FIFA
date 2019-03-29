import React, {Component} from 'react';
import {List, Card, Avatar, Row, Col, Tag, Input, Button} from 'antd';
import sina from '~/assets/img/sina.svg';
import wechat from '~/assets/img/wechat.svg';
import Documentation from '~/components/documentation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import MultiComment from '../components/MultiComment';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)
class Details extends Component {
  state = {
    tagArray: ['FIFA', 'FIFA19', '补丁', 'FUT', '俱乐部'],
    comment: '',
  };

  render() {
    const {tagArray, comment} = this.state;
    const {TextArea} = Input;
    return (
      <div>
        <img />
        <article>假装这里有一篇很长很长的小作文</article>
        <div className="dashedLine" />
        <div className="flex_1">
          <div className="flex_1">
            {tagArray.map((item) => <Tag color="#1A47B0">{item}</Tag>)}
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
