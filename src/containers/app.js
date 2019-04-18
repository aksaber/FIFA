import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from '../redux/reduces/home';
import Fifaheader from '../components/Fifaheader';
import Fifafooter from '../components/Fifafooter';
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
  };
  //将要装载，在render之前调用
  componentWillMount() {
    const {history, changeRoute, home: {currentRoute}} = this.props;
    //当前路由为'/'时跳转到home首页
    if (currentRoute === '/') {
      changeRoute('home');
      history.push('/home');
    }
  }

  render() {
    return (
      <div className="home">
        <Fifaheader history={this.props.history} />
        <div>
          {this.props.children}
        </div>
        <Fifafooter />
      </div>
    );
  }
}

export default App;
