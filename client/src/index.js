import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App.jsx";
import { BrowserRouter } from 'react-router-dom';

render (
	<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
