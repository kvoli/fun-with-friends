import { combineReducers } from "redux";
import artifacts from "./artifacts";
import focusView from "./focusView";
import filters from "./filters";
import auth from './auth';
import launchSnackbar from './snackbar'

export default combineReducers({
	artifacts,
	focusView,
  filters,
  auth,
  launchSnackbar
});
