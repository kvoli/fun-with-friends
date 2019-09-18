<<<<<<< HEAD
import { ADD_CIRCLE, ADD_CIRCLE_USER, REMOVE_CIRCLE, REMOVE_CIRCLE_USER } from "../constants/action-types.js";
=======
import { ADD_CIRCLE, ADD_CIRCLE_USER, REMOVE_CIRCLE, REMOVE_CIRCLE_USER, OPEN_CIRCLE_FORM } from "../constants/action-types.js";
>>>>>>> kvoli-grouppage

export const addCircle = (payload) => ({
	type: ADD_CIRCLE,
	payload: payload
});

export const addCircleUser = (payload) => ({
	type: ADD_CIRCLE_USER,
	payload: payload
});

export const removeCircle = (payload) => ({
	type: REMOVE_CIRCLE,
	payload: payload
});

export const removeCircleUser = (payload) => ({
	type: REMOVE_CIRCLE_USER,
	payload: payload
});
<<<<<<< HEAD
=======

export const openCircleForm = (payload) => ({
	type: OPEN_CIRCLE_FORM,
	payload: payload,
})
>>>>>>> kvoli-grouppage
