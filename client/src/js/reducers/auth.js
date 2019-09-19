import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, LOGOUT_SUCCESS, LOGOUT_REQUEST } from '../constants/auth';

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const initialState = user
  ? {
      pending: false,
      success: true,
      user,
      token,
    }
  : {
      pending: false,
      success: false,
      user: {},
      token: '',
    };

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        pending: true,
        success: false,
        user: {},
        token: '',
      };
    case LOGIN_SUCCESS:
      return {
        pending: false,
        success: true,
        user: action.user,
        token: action.token,
      };
    case LOGIN_FAILURE:
      return {
        pending: false,
        success: false,
        user: {},
        token: '',
      };

    case SIGNUP_REQUEST:
      return {
        pending: true,
        success: false,
        user: {},
        token: '',
      };

    case SIGNUP_SUCCESS:
      return {
        pending: false,
        success: true,
        user: action.user,
        token: action.token,
      };

    case SIGNUP_FAILURE:
      return {
        pending: false,
        success: false,
        user: {},
        token: '',
      };

    case LOGOUT_SUCCESS:
      return {
        pending: false,
        success: false,
        user: {},
        token: '',
      };

    case LOGOUT_REQUEST:
      return {
        pending: true,
        success: true,
        user: action.user,
        token: action.token,
      };

    default:
      return state;
  }
};

export default auth;
