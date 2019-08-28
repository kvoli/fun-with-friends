import { LAUNCH_SNACKBAR, CLOSE_SNACKBAR } from '../constants/action-types';

const initialState  = {
    active: false
}
  
const snackbar = (state = initialState, action) => {
    switch (action.type) {
        case LAUNCH_SNACKBAR:
            return {
                active: true
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