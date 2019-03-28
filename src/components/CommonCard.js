import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'antd';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)


class CommonCard extends Component {
  render() {
    const {Meta} = Card;

    return (
      <Card
        hoverable
        className="commonCard"
        cover={<img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          // src={this.props.data.coverUrl}
          className="commonCardImg"
        />}
        bordered
      >
        <Meta
          title={this.props.data.title}
          description={this.props.data.summary}
        />
      </Card>
    );
  }
}

export default CommonCard;
