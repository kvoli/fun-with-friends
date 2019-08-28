import { LAUNCH_SNACKBAR, CLOSE_SNACKBAR } from '../constants/action-types';

export const launchSnackbar = () => ({
	type: LAUNCH_SNACKBAR
})

export const closeSnackbar = () => ({
	type: CLOSE_SNACKBAR
})

