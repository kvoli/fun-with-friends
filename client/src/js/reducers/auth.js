import {
  AUTH_ERROR,
  USER_LOADING, USER_LOADED,
  LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS, SIGNUP_FAILURE
} from '../constants/auth';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null, 
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS:
    case SIGNUP_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state, 
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default: 
      return state;
  }
}
