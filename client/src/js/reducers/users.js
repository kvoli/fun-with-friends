import {
  ADD_CIRCLE_USER,
  REMOVE_CIRCLE_USER
} from '../constants/action-types.js';
import uuid from 'uuid';

const initialState = {};

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CIRCLE_USER:
      return {};
    case REMOVE_CIRCLE_USER:
      return {};
    default:
      return state;
  }
};

export default users;
