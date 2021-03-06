import React, {Component} from 'react';
import {Avatar, Row, Col, Tag, Input, message, Icon} from 'antd';
import sina from '~/assets/img/sina-blue.svg';
import wechat from '~/assets/img/wechat-blue.svg';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import CommonCard from '../components/CommonCard';
import axios from '../axios';
import CommentList from '../components/CommentList';
import InfoAdvert from '../components/infoAdvert';

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
      id: '',
      tagArray: [],
      content: '',
      tagInfo: [],
      data: '',
      words: '',
      messageData: [],
      pageNo: 1,
      total: 0,
    };
  }

  componentDidMount() {
    const {changeRoute} = this.props;
    changeRoute('details');
    this.getDetail();
  }

  componentWillUnmount() {
    document.title = '非凡网';
  }

  //点击不可错过内容重新渲染页面数据
  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        urlParams: this.formatSearch(nextProps.location.search)
      }, () => {
        //获取文章详情
        this.getDetail();
      });
    }
  }

  //获取文章详情
  getDetail = () => {
    const {getDetailData, history} = this.props;
    axios.get(`/news/news/${this.state.urlParams.majorKey}`).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        this.setState({
          id: data.data.info.id,
          tagArray: data.data.tags,
          content: data.data.info.content,
          tagInfo: data.data.tagInfo,
          data: data.data.info
        }, () => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          //获取文章一级评论
          this.getMessage();
        });
        //设置网页title
        document.title = data.data.info.title;
        // getDetailData(data.data.info);
      } else {
        message.warning(data.msg);
        history.goBack();
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //获取当篇文章的一级评论
  getMessage = () => {
    axios.post('/news/member/messageList', {
      asc: true,
      map: {id: this.state.id},
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          messageData: res.data.data.records,
          total: res.data.data.total
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //发布留言（一级评论）
  postMessage = () => {
    const {words} = this.state;
    const {home: {userInfo}} = this.props;
    if (Object.keys(userInfo).length === 0) {
      message.warning('请先登录再回复');
      return false;
    }
    if (words === '') {
      message.warning('请输入内容');
      return false;
    }
    axios.post('/news/member/save', {
      content: words,
      memId: userInfo.id,
      infoId: this.state.id
    }).then((res) => {
      const {data} = res;
      if (data.code === '0') {
        //更新一级评论并清空输入框，将分页重置为1
        this.setState({
          words: '',
          pageNo: 1
        }, () => {
          this.getMessage();
        });
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

  //绑定input值
  _changeValue = (event) => {
    const o = {};
    o[event.target.name] = event.target.value;
    this.setState(o);
  };

  //加载更多
  loadMore = async () => {
    await this.setState({pageNo: this.state.pageNo + 1});
    axios.post('/news/member/messageList', {
      asc: true,
      map: {id: this.state.id},
      nowPage: this.state.pageNo,
      pageSize: 9,
      sort: 'string'
    }).then((res) => {
      if (res.data.code === '0') {
        this.setState({
          messageData: this.state.messageData.concat(res.data.data.records),
          total: res.data.data.total
        });
      } else {
        message.warning(res.data.msg);
      }
    }).catch((err) => {
      message.error(`${err}`);
    });
  };

  //点击标签跳转标签列表
  gotoTagList = (id) => {
    const {history} = this.props;
    history.push(`/tagList?id=${id}`);
  };

  render() {
    const {
      tagArray,
      tagInfo,
      content,
      words,
      urlParams,
      messageData,
      total,
      data
    } = this.state;
    const {TextArea} = Input;
    const {home: {userInfo, screenW}} = this.props;
    return (
      <div>
        {screenW < 768 ? '' : <InfoAdvert data={data} location={this.props.location} type="details" />}
        <div className="detailDiv container">
          <div
            style={{
              margin: '-7px -15px 15px',
              position: 'relative',
              marginBottom: 15,
              display: screenW < 768 ? 'block' : 'none'
            }}
          >
            <img src={data.coverUrl} style={{width: '100%', height: 233}} />
            <div className="detailTopMask">
              <div>{data.newsCategoryName}</div>
              <p className="ellipsis title">{data.title}</p>
            </div>
          </div>
          <div className="detailContent" dangerouslySetInnerHTML={{__html: content}} />
          <div className="dashedLine" />
          <div className="flex" style={{padding: '28px 0 68px 0'}}>
            <div className="flex_1">
              {tagArray ? tagArray.map((item) => (<Tag
                className="tagColor"
                style={{display: item.name !== '' ? 'inline' : 'none'}}
                key={item.id}
                onClick={() => this.gotoTagList(item.id)}
              >{item.name}</Tag>)) : ''}
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
          <div style={{marginBottom: 97, display: data.openComment === 0 ? 'none' : 'block'}}>
            <div style={{position: 'relative'}}>
              <Avatar
                size={48}
                icon={userInfo.headPortraitUrl ? '' : 'user'}
                src={userInfo.headPortraitUrl}
                style={stylesheet.avater}
              />
              <TextArea
                rows={3}
                value={words}
                placeholder="发布您的留言"
                onChange={this._changeValue}
                name="words"
                style={stylesheet.textarea}
              />
            </div>
            <div style={stylesheet.textFooter}>
              <button className="submitComment" onClick={this.postMessage}>发布</button>
            </div>
          </div>
          <CommentList data={messageData} openComment={data.openComment} />
          {messageData.length < total ?
            <div style={{textAlign: 'center', marginTop: 20}}>
              <button className="loadMoreBtn" onClick={this.loadMore}>查看更多评论</button>
            </div>
            : <div style={{textAlign: 'center', marginTop: 20}}>
              <button className="loadMoreBtn" >没有更多评论</button>
            </div>}
          <div className="flex" style={{margin: '129px 0 38px 0'}}>
            <div className="dashedLine flex_1" />
            <div style={stylesheet.words}>不能错过的内容</div>
            <div className="dashedLine flex_1" />
          </div>
          <div>
            <Row>{tagInfo ? tagInfo.map(item => (<Col
              span={8}
              key={item.id}
            ><CommonCard data={item} history={this.props.history} location="details" /></Col>)) : ''}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchDetails;
