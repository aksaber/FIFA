import {createStore, applyMiddleware} from 'redux';
import reduxOrder from 'redux-order';
import reducers from './reduces';
import DevTools from './DevTools';

// const enhancer = compose(
//   applyMiddleware(reduxOrder()),
//   DevTools.instrument()
// );

/* redux通过createStore创建store */
/* createStore(reducers, [preloadedState], [enhancer]) */
const store = createStore(reducers);

export default store;
