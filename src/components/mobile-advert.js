import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  mask: {
    width: '100%',
    height: 119,
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.78))',
    padding: '18px 22px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class MobileAdvert extends Component {
  render() {
    const {data} = this.props;
    return (
      <div style={{position: 'relative', color: '#fff'}}>
        <img src={data.coverUrl} style={{width: '100%', height: 314}} />
        <div style={stylesheet.mask} className="ellipsis">
          <p>{data.newsCategoryName}</p>
          <p style={stylesheet.title} className="ellipsis">{data.title}</p>
        </div>
      </div>
    );
  }
}

export default MobileAdvert;
