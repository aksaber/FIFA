import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import logo from '~/assets/logo.png';
import Banner from '~/components/banner';
import * as homeActions from '../redux/reduces/home';
/*
使用注解的方式修改state和组件之间的传值 @connect()
state => ({home: state.home})  你需要state当中的什么参数，取出来就会放到props相对的参数当中
dispatch => bindActionCreators(actionCreators, dispatch) 你需要state当中的什么方法，就可写到下面的大括号中就能被放到props当中，并自动dispatch
*/
@connect(
  state => ({home: state.home}),
  dispatch => bindActionCreators(homeActions, dispatch)
)

class App extends Component {
  state = {
  }
  //将要装载，在render之前调用
  componentWillMount() {
    const {initalLogo} = this.props;
    initalLogo();
  }
  //点击logo时触发changeRoute方法，movelogo = true，跳转/docs路由
  handleBrowserChange = () => {
    const {history, changeRoute} = this.props;
    changeRoute();
    history.push('/docs');
  }
  render() {
    /* 相当于const movelogo = this.props.home.movelogo */
    const {home: {movelogo}} = this.props;
    const demoStyle = {
      color: '#FF0000'
    };
    return (
      <div className="home" style={{paddingTop: 100}}>
        <div className={`center ${movelogo ? 'logo-move' : ''}`} onClick={this.handleBrowserChange}>
          <div className="logo-box">
            {/*<img src={logo} className="logo" />*/}
            <Banner />
          </div>
          <h1 style={demoStyle}>React Project</h1>
        </div>
        <div style={{width: '1000px', margin: '0 auto'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
