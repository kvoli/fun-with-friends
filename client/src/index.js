import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./js/store/index";
import App from "./js/components/App.jsx";
import { Router } from 'react-router-dom';
import history from './history';
import { PersistGate } from 'redux-persist/integration/react';

render (
	<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
	</Provider>,
	document.getElementById("root")
);