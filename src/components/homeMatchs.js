import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  top: {
    padding: 15,
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
    fontSize: 18
  },
  line: {

  },
  mask: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    width: '100%',
    background: '#030303',
    color: '#fff',
    opacity: '0.64',
    padding: '9px 12px'
  },
  mask2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#030303',
    color: '#fff',
    opacity: '0.64',
    padding: '9px 12px'
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class HomeMatchs extends Component {
  render() {
    const {data} = this.props;
    return (
      <div style={{marginRight: 10}}>
        <div style={stylesheet.top}>
          <div className="flex" style={{marginBottom: 15}}>
            <img src={data.coverUrl} width={260} height={260} style={{marginRight: 15}} />
            <div className="flex_1">
              {data.infos.length > 0 ?
                <div>
                  <div style={{position: 'relative'}}>
                    <img src={data.infos[0].coverUrl} width={255} height={120} style={{marginBottom: 20}} />
                    <div style={stylesheet.mask}>{data.infos[0].title}</div>
                  </div>
                  <div style={{position: 'relative'}}>
                    <img src={data.infos[1].coverUrl} width={255} height={120} />
                    <div style={stylesheet.mask2}>{data.infos[1].title}</div>
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
                <div>
                  <span style={stylesheet.title2}>{data.infos[2].title}</span>
                  <span style={{float: 'right'}}>{data.infos[2].createTime}</span>
                </div>
              </div>
              <div style={{marginBottom: 19}}>{data.infos[2].summary}</div>
            </div> : ''}
          <div style={stylesheet.line} />
          {data.infos.length > 4 ?
            <div>
              <div style={{marginBottom: 19}}>
                <span style={stylesheet.title2}>{data.infos[3].title}</span>
                <span style={{float: 'right'}}>{data.infos[3].createTime}</span>
              </div>
              <div style={{marginBottom: 19}}>{data.infos[3].summary}</div>
            </div> : ''}
        </div>
      </div>
    );
  }
}

export default HomeMatchs;
