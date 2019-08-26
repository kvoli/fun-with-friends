import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "../reducers/index";
import thunk from 'redux-thunk';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;