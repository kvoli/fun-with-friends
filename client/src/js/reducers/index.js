import { combineReducers } from 'redux';
import artifacts from './artifacts';
import focusView from './focusView';
import filters from './filters';
import auth from './auth';
import circle from './circle';
import user from './user';
// import socket from "./socket";

export default combineReducers({
  artifacts,
  focusView,
  filters,
  auth,
  // socket,
  circle,
  user,
});
