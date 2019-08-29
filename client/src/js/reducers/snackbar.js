import { LAUNCH_DELETE_SNACKBAR, CLOSE_SNACKBAR, LAUNCH_ADD_SNACKBAR, LAUNCH_EDIT_SNACKBAR } from '../constants/action-types';

const initialState  = {
    active: false,
    change: ''
}
  
const snackbar = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCH_DELETE_SNACKBAR:
            return {
                active: true,
                change: 'deleted'
            }
        case LAUNCH_EDIT_SNACKBAR:
            return {
                active: true,
                change: 'edited'
            }
        case LAUNCH_ADD_SNACKBAR:
            return {
                active: true,
                change: 'added'
            }
        case CLOSE_SNACKBAR:
            return {
                active: false
            }
        default:
             return state
    }
}

export default snackbar;