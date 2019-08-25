import { GET_ERRORS, CLEAR_ERRORS } from '../constants/error';

const initialState = {
  message: {},
  status: null, 
  id: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_ERRORS:
      return {
        message: action.payload.message,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null
      };
    default: 
      return state;
  }
}