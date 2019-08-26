import { combineReducers } from "redux";
import artifacts from "./artifacts";
import focusView from "./focusView";
import filters from "./filters";
import auth from './auth';

export default combineReducers({
	artifacts,
	focusView,
  filters,
  auth
});
