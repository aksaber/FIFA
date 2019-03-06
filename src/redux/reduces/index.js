/* eslint-disable import/no-named-as-default */
import {combineReducers} from 'redux';
import home from './home';

export default combineReducers({
  home
});

/*
reducer可拆分多个，分别处理不同类的业务，然后通过combineReducers合并成一个
combineReducers({
  reducer1,
  reducer2,
  ...
})
 */
