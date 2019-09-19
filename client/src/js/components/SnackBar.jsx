/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { closeSnackbar } from '../actions/snackbar';

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[600],
  },
}));
function MySnackbarContentWrapper(props) {
  const { message, onClose } = props;
  const style = useStyles();
  return (
    <SnackbarContent
      className={clsx(style.success, 'success')}
      message={message}
      action={[
        <IconButton key='close' aria-label='close' onClick={onClose}>
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

export default function CustomizedSnackbars() {
  const active = useSelector(store => store.launchSnackbar.active);
  const change = useSelector(store => store.launchSnackbar.change);
  const dispatch = useDispatch();
  const message = `Artifact successfully ${change}`;

  function handleClose(reason) {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={active}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper onClose={handleClose} message={message} />
      </Snackbar>
    </div>
  );
}
