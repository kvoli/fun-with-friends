import { LAUNCH_DELETE_SNACKBAR, CLOSE_SNACKBAR, LAUNCH_EDIT_SNACKBAR, LAUNCH_ADD_SNACKBAR } from '../constants/action-types';

export const launchDeleteSnackbar = () => ({
  type: LAUNCH_DELETE_SNACKBAR,
});

export const closeSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const launchEditSnackbar = () => ({
  type: LAUNCH_EDIT_SNACKBAR,
});

export const launchAddSnackbar = () => ({
  type: LAUNCH_ADD_SNACKBAR,
});
