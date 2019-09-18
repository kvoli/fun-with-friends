import {
  GET_ALL_USERS_SUCCESS,
  // GET_ALL_USERS_FAILURE,
  // GET_ALL_USERS_REQUEST
} from '../constants/circle';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default user;
