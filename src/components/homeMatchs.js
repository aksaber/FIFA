import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  top: {
    padding: 20,
    background: '#fff',
    boxShadow: '20px 20px 60px rgba(0, 0, 0, 0.1)'
  },
  bottom: {
    padding: '30px 37px',
    color: '#595F6F'
  },
  title: {
    color: '#1A47B0',
    fontSize: 30,
    marginLeft: 19
  },
  title2: {
    color: '#1A47B0',
    fontSize: 18,
    cursor: 'pointer',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flex: 1
  },
  line: {

  },
  mask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 66,
    background: '#030303',
    color: '#fff',
    opacity: '0.64',
    padding: '13px 20px',
    fontSize: 17,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  blueMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#1C4FF9',
    opacity: 0,
    transition: 'opacity ease 0.8s',
    textAlign: 'center',
    color: '#fff'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeMatchs extends Component {
  //跳转电竞赛事分类列表
  gotoList = (id) => {
    const {history} = this.props;
    history.push(`/match?id=${id}`);
  };
  //跳转电竞赛事详情页
  gotoMatchs = (id, customizeUrl) => {
    const {
      history
    } = this.props;
    history.push(`/matchDetails?id=${id}&state=${id}&majorKey=${customizeUrl}`);
  };
  render() {
    const {data} = this.props;
    return (
      <div style={{marginRight: 10}}>
        <div style={stylesheet.top}>
          <div className="flex" style={{marginBottom: 21}}>
            <div
              onClick={() => this.gotoList(data.id)}
              style={{overflow: 'hidden', width: 340, marginRight: 20}}
            >
              <img
                src={data.indexCoverUrl}
                width={340}
                height={340}
                style={{cursor: 'pointer'}}
                className="childListImg"
              />
            </div>
            <div className="flex_1">
              {data.infos.length > 0 ?
                <div>
                  <div
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      marginBottom: 20
                    }}
                    onClick={() => this.gotoMatchs(data.infos[0].id, data.infos[0].customizeUrl)}
                  >
                    <img
                      src={data.infos[0].coverUrl}
                      height={160}
                      style={{width: '100%'}}
                      className="childListImg"
                    />
                    <div style={stylesheet.mask}>{data.infos[0].title}</div>
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onClick={() => this.gotoMatchs(data.infos[1].id, data.infos[1].customizeUrl)}
                  >
                    <img
                      src={data.infos.length > 1 ? data.infos[1].coverUrl : null}
                      height={160}
                      style={{width: '100%'}}
                      className="childListImg"
                    />
                    <div
                      style={stylesheet.mask}
                      onClick={() => this.gotoMatchs(data.infos[1].id, data.infos[1].customizeUrl)}
                    >
                      {data.infos.length > 1 ? data.infos[1].title : null}
                    </div>
                  </div>
                </div> : ''}
            </div>
          </div>
          <div style={stylesheet.title}>{data.name}</div>
        </div>
        <div style={stylesheet.bottom}>
          {data.infos.length > 3 ?
            <div>
              <div style={{marginBottom: 19}}>
                <div className="flex">
                  <span
                    style={stylesheet.title2}
                    onClick={() => this.gotoMatchs(data.infos[2].id, data.infos[2].customizeUrl)}
                  >{data.infos[2].title}</span>
                  <span style={{float: 'right', marginTop: 3}}>{data.infos[2].createTime}</span>
                </div>
              </div>
              <div style={{marginBottom: 19}}>{data.infos[2].summary}</div>
            </div> : ''}
          <div style={stylesheet.line} />
          {data.infos.length > 4 ?
            <div>
              <div className="flex" style={{marginBottom: 19}}>
                <span
                  style={stylesheet.title2}
                  onClick={() => this.gotoMatchs(data.infos[3].id, data.infos[3].customizeUrl)}
                >{data.infos[3].title}</span>
                <span style={{float: 'right', marginTop: 3}}>{data.infos[3].createTime}</span>
              </div>
              <div style={{marginBottom: 19}}>{data.infos[3].summary}</div>
            </div> : ''}
        </div>
      </div>
    );
  }
}

export default HomeMatchs;
