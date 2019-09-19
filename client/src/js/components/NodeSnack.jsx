import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';

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
      enqueueSnackbar(message, { variant });
      return null;
    };
    ReactDOM.render(
      // see https://github.com/iamhosseindhv/notistack#snackbarprovider
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <ShowSnackbar message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint
    );
  },
};
