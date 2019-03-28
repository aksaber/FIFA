import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class childList extends Component {
  renderList = () => {
    const liStyle = {
      color: '#414141',
      fontSize: '18px'
    };
    const {data} = this.props;
    const list = [];
    data.map((item) => {
      list.push(<li style={liStyle}>{item.name}</li>);
    });
    return list;
  };

  render() {
    const ulStyle = {
      height: '200px',
      width: '100%',
      background: '#fff',
      opacity: 0.8,
      padding: '17px 10%',
      transition: 'all 0.5s',
      position: 'absolute',
      top: '70px',
      left: 0
    };

    return (
      <ul
        style={ulStyle}
        className={this.props.isShow ? 'show' : 'hidden'}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >{this.renderList()}</ul>
    );
  }
}

export default childList;
