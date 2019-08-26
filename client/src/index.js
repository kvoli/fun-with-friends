import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App.jsx";
import { Router } from 'react-router-dom';
import history from './history';

render (
	<Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
	</Provider>,
	document.getElementById("root")
);
