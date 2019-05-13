import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'antd';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  commonCard: {
    padding: 18,
    margin: '20px',
    height: '437px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
    opacity: 1,
    borderRadius: '5px',
    border: '1px solid #fff'
  },
  commonCardImg: {
    width: '100%',
    height: 220,
    borderRadius: 5
  },
  commonCardBody: {
    padding: '21px 19px 0 19px',
  }
};

@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class CommonCard extends Component {
  gotoDetails = () => {
    const {
      history,
      changeRoute,
      data,
      location
    } = this.props;
    changeRoute('details');
    history.push(`/${location}?id=${data.id}&state=${data.id}&majorKey=${data.customizeUrl}`);
    // history.push({pathname: '/details', state: {id: data.id}});
  };

  render() {
    const {Meta} = Card;
    const {data} = this.props;
    return (
      <Card
        hoverable
        style={stylesheet.commonCard}
        cover={<img
          src={data.coverUrl}
          style={stylesheet.commonCardImg}
          className="commonCardImg"
        />}
        onClick={this.gotoDetails}
        bodyStyle={stylesheet.commonCardBody}
      >
        <div
          style={{
            color: '#595F6F',
            fontSize: 16,
            marginBottom: 17
          }}
        >{data.categoryName}</div>
        <Meta
          title={data.title}
          description={data.summary}
        />
      </Card>
    );
  }
}

export default CommonCard;
