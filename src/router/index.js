import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  HashRouter
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import createHistory from 'history/createHashHistory';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import App from '../containers/app';
import Register from '../containers/register';
import Login from '../containers/login';
import ForgetPsw from '../containers/forgetPsw';
import ResetPsw from '../containers/resetPsw';
import Home from '../containers/home';
import Informations from '../containers/informations';
import Match from '../containers/Match';
import Details from '../containers/details';
import MatchDetails from '../containers/matchDetails';
import GuidanceDetails from '../containers/guidanceDetails';
import UserInfo from '../containers/userInfo';
import UserInformation from '../containers/userInformation';
import AccountManagement from '../containers/accountManagement';
import MessageCenter from '../containers/messageCenter';
import Search from '../containers/search';
import Clause from '../containers/clause';

const history = createHistory();

const Router = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);

/*Provider提供store，Provider里都能获取到Store*/
/*使用BrowserHistory需要后端nginx也配置页面，使用hashHistory不需配置*/
const Root = () => (
  <HashRouter>
    <Provider store={Store} history={history}>
      <div className="router-content">
        {/*{__DEVELOPMENT__ && <DevTools />}*/}
        <Switch>
          <Router path="/login" component={Login} />
          <Router path="/register" component={Register} />
          <Router path="/forgetPsw" component={ForgetPsw} />
          <Router path="/resetPsw" component={ResetPsw} />
          <Router path="/clause" component={Clause} />
          <Router path="/" component={App} >
            {/* exact要求路径与location.pathname必须完全匹配 */}
            <Router exact path="/home" component={Home} />
            <Router exact path="/informations" component={Informations} />
            <Router exact path="/match" component={Match} />
            <Router exact path="/details" component={Details} />
            <Router exact path="/matchDetails" component={MatchDetails} />
            <Router exact path="/guidanceDetails" component={GuidanceDetails} />
            <Router exact path="/search" component={Search} />
            <Router path="/userInfo" component={UserInfo}>
              <Router path="/userInfo/userInformation" component={UserInformation} />
              <Router path="/userInfo/accountManagement" component={AccountManagement} />
              <Router path="/userInfo/messageCenter" component={MessageCenter} />
            </Router>
          </Router>
        </Switch>
      </div>
    </Provider>
  </HashRouter>
);

export default hot(module)(Root);
