import { combineReducers } from "redux";
import artifacts from "./artifacts";
import focusView from "./focusView";
import error from './error';
import auth from './auth';

export default combineReducers({
	artifacts,
  focusView,
  error,
  auth,
})
