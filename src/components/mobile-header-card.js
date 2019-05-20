import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class mobileHeaderCard extends Component {
  gotoDetail = (type, id) => {
    //跳转到相应资讯/赛事列表
    const {history} = this.props;
    if (type === 0) {
      history.push(`/informations?id=${id}`);
    } else {
      history.push(`/match?id=${id}`);
    }
    this.props.toggleMenu();
  };

  render() {
    const {data} = this.props;
    return (
      <div>
        <div onClick={() => this.gotoDetail(data.type, data.id)}>
          <img src={data.coverUrl} style={{width: '100%'}} />
        </div>
        <p style={{fontSize: 12, marginTop: 10}}>{data.name}</p>
      </div>
    );
  }
}

export default mobileHeaderCard;
