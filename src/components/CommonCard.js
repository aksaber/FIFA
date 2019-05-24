import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card} from 'antd';
import * as homeActions from '../redux/reduces/home';

const stylesheet = {
  commonCard: {
    margin: '20px',
    height: '437px',
    background: 'rgba(255,255,255,1)',
    boxShadow: '20px 20px 60px rgba(0,0,0,0.1)',
    opacity: 1,
    borderRadius: '5px',
    border: '1px solid #fff'
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
      data,
      location
    } = this.props;
    history.push(`/${location}?majorKey=${data.customizeUrl}`);
    // history.push(`/${location}/${data.customizeUrl}`);
    // history.push({pathname: '/details', state: {id: data.id}});
  };

  render() {
    const {Meta} = Card;
    const {data} = this.props;
    return (
      <Card
        hoverable
        style={stylesheet.commonCard}
        onClick={this.gotoDetails}
        // cover={<img
        //   src={data.coverUrl}
        //   className="commonCardImg"
        // />}
        // bodyStyle={stylesheet.commonCardBody}
      >
        <div className="commonCardImgDiv">
          <img
            src={data.coverUrl}
            className="commonCardImg"
          />
          <div className="commonCardMask">
            <div style={{marginTop: 47}}>
              <p style={{fontSize: 20, fontWeight: 'bold'}}>
                {data.author ? data.author : 'admin'}
              </p>
              <p style={{fontSize: 16}}>{data.createTime}</p>
              <div style={{width: '80%', margin: '0 auto'}}>
                {data.tagRelationName ? data.tagRelationName.slice(0, 2).map(item => (
                  <span className="tag ellipsis">{item}</span>
                )) : ''}
              </div>
            </div>
          </div>
        </div>
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
