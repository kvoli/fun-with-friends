import { combineReducers } from "redux";
import artifacts from "./artifacts";
import focusView from "./focusView";
import filters from "./filters";
import auth from './auth';
import launchSnackbar from './snackbar'
import circles from './circles';
// import socket from "./socket";

export default combineReducers({
	artifacts,
	focusView,
  filters,
  auth,
  launchSnackbar,
  // socket,
  circles,
});
