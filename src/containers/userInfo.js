import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import UserBasicLeft from '../components/userBasicLeft';
import UserBasicTop from '../components/userBasicTop';
import '../style/userInfo.scss';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class UserInfo extends Component {
  // componentDidMount() {
  //   const {history} = this.props;
  //   history.push('/userInfo/userInformation');
  // }

  render() {
    const {home: {isFixed, screenW}} = this.props;
    return (
      <div className="userInfo clearAfter" style={{marginTop: isFixed ? 90 : 0}}>
        {screenW < 768
          ? <UserBasicTop history={this.props.history} />
          : <UserBasicLeft history={this.props.history} />}
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default UserInfo;
