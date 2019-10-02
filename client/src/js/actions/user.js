import {
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST
} from '../constants/circle';

// Different dispatch possibilities for getting all userss. Either a request, success or failure.
export const getAllUsersRequest = () => ({
  type: GET_ALL_USERS_REQUEST,
});

export const getAllUsersSuccess = payload => ({
  type: GET_ALL_USERS_SUCCESS,
  payload,
});

export const getAllUsersFailure = () => ({
  type: GET_ALL_USERS_FAILURE,
});

// Sends a request {} requesting a list of all users *GET*
export const getAllUsers = token => {
  return dispatch => {
    dispatch(getAllUsersRequest());
    const endpoint = '/api/user';
    const parameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 200) {
          dispatch(getAllUsersSuccess(json));
        } else {
          dispatch(getAllUsersFailure());
        }
      })
    );
  };
};
