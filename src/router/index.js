import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import App from '../containers/app';
import Register from '../containers/register';
import Login from '../containers/login';
import ForgetPsw from '../containers/forgetPsw';
import Home from '../containers/home';
import Informations from '../containers/informations';
import Match from '../containers/Match';
import Details from '../containers/details';
import MatchDetails from '../containers/matchDetails';
import UserInfo from '../containers/userInfo';
import UserInformation from '../components/userInformation';
import AccountManagement from '../containers/accountManagement';
import MessageCenter from '../containers/messageCenter';
import Reviews from '../containers/reviews';

const Router = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);

/*Provider提供store，Provider里都能获取到Store*/
const Root = () => (
  <BrowserRouter>
    <Provider store={Store}>
      <div className="router-content">
        {/*{__DEVELOPMENT__ && <DevTools />}*/}
        <Switch>
          <Router path="/login" component={Login} />
          <Router path="/register" component={Register} />
          <Router path="/forgetPsw" component={ForgetPsw} />
          <Router path="/" component={App} >
            {/* exact要求路径与location.pathname必须完全匹配 */}
            <Router exact path="/home" component={Home} />
            <Router exact path="/informations" component={Informations} />
            <Router exact path="/match" component={Match} />
            <Router exact path="/details" component={Details} />
            <Router exact path="/matchDetails" component={MatchDetails} />
            <Router path="/userInfo" component={UserInfo}>
              <Router exact path="/userInfo/userInformation" component={UserInformation} />
              <Router exact path="/userInfo/accountManagement" component={AccountManagement} />
              <Router exact path="/userInfo/messageCenter" component={MessageCenter} />
              <Router exact path="/userInfo/reviews" component={Reviews} />
            </Router>
          </Router>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
