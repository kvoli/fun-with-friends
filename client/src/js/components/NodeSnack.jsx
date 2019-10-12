/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import Theme from './Theme';
import { Provider } from 'react-redux';
import { store } from '../store/index';

// add a <div> child to body under which to mount the snackbars
const mountPoint = document.createElement('div');
document.body.appendChild(mountPoint);

export default {
  success(msg) {
    this.toast(msg, 'success');
  },
  warning(msg) {
    this.toast(msg, 'warning');
  },
  info(msg) {
    this.toast(msg, 'info');
  },
  error(msg) {
    this.toast(msg, 'error');
  },
  toast(msg, variant = 'default') {
    const ShowSnackbar = ({ message }) => {
      const { enqueueSnackbar } = useSnackbar();
      const { closeSnackbar } = useSnackbar();
      const action = key => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <HighlightOffIcon color='disabled' />
        </IconButton>
      );
      enqueueSnackbar(message, { variant, autoHideDuration: 3000, action });
      return null;
    };
    ReactDOM.render(
      <Provider store={store}>
        <Theme>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
            <ShowSnackbar message={msg} variant={variant} />
          </SnackbarProvider>
        </Theme>
      </Provider>,
      mountPoint
    );
  },
};
