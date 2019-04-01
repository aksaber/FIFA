import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'antd';
import logo from '~/assets/logo.png';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  commonCard: {
    padding: '10px 18px 18px',
    margin: '20px',
    height: '434px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
    opacity: 1,
    borderRadius: '5px',
    border: '1px solid #fff'
  },
  commonCardImg: {
    width: '100%',
    height: 220
  },
  commonCardBody: {
    padding: '22px 20px',
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)


class CommonCard extends Component {
  gotoDetails = () => {
    // console.log(this.props, 'commonCard');
    const {history, changeRoute, data} = this.props;
    changeRoute();
    history.push(`/details?id=${data.id}`);
  }


  render() {
    const {Meta} = Card;
    return (
      <Card
        hoverable
        style={stylesheet.commonCard}
        cover={<img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          // src={this.props.data.coverUrl}
          style={stylesheet.commonCardImg}
        />}
        onClick={this.gotoDetails}
        bodyStyle={stylesheet.commonCardBody}
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
