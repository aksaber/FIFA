import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {hot} from 'react-hot-loader';
import Store from '../redux';
import DevTools from '../redux/DevTools';
import App from '../containers/app';
import Docs from '../containers/docs';
import Informations from '../containers/informations';
import Match from '../containers/Match';

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
        {__DEVELOPMENT__ && <DevTools />}
        <Switch>
          <Router path="/" component={App} >
            {/* exact要求路径与location.pathname必须完全匹配 */}
            <Router exact path="/docs" component={Docs} />
            <Router exact path="/informations" component={Informations} />
            <Router exact path="/match" component={Match} />
          </Router>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default hot(module)(Root);
