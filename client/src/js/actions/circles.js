import {
  ADD_CIRCLE,
  ADD_CIRCLE_USER,
  REMOVE_CIRCLE,
  REMOVE_CIRCLE_USER,
  OPEN_CIRCLE_FORM
} from '../constants/action-types.js';

export const localAddCircle = payload => ({
  type: ADD_CIRCLE,
  payload: payload
});

export const localAddCircleUser = payload => ({
  type: ADD_CIRCLE_USER,
  payload: payload
});

export const removeCircle = payload => ({
  type: REMOVE_CIRCLE,
  payload: payload
});

export const removeCircleUser = payload => ({
  type: REMOVE_CIRCLE_USER,
  payload: payload
});

export const openCircleForm = payload => ({
  type: OPEN_CIRCLE_FORM,
  payload: payload
});

export const addCircleUser = user => {
  return dispatch => {
    const endpoint = '/api/circle';
    const parameters = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(circle)
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          console.log('success');
          dispatch(localAddCircle(circle));
        } else {
          console.log('failure');
        }
      })
    );
  };
};

export const createCircle = circle => {
  return dispatch => {
    const endpoint = '/api/circle';
    const parameters = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(circle)
    };
    fetch(endpoint, parameters).then(response =>
      response.json().then(json => {
        if (response.status === 201) {
          console.log('success');
          dispatch(localAddCircle(circle));
        } else {
          console.log('failure');
        }
      })
    );
  };
};
