import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Avatar} from 'antd';

import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class Fifaheader extends Component {
  gotoFIFA = () => {
    console.log(this.props);
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/informations');
    // this.props.history.push('/informations');
  }

  render() {
    return (
      <div className="fifaheader">
        <div className="leftheader">
          <img src={logo} height="70" />
          <ul className="tab">
            <li>首页</li>
            <div onClick={this.gotoFIFA}>
              <li>FIFA资讯</li>
            </div>
            <li>电竞赛事</li>
          </ul>
        </div>
        <div className="rightheader">
          <div>
            <Avatar shape="circle" icon="user" />

          </div>
        </div>

      </div>
    );
  }
}

export default Fifaheader;
