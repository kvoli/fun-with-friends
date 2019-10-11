/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import { deleteCircle } from '../actions/circle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteCircle = ({ circle }) => {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  const [outerOpen, setOuterOpen] = React.useState(false);

  function handleClickOpen() {
    setOuterOpen(true);
  }

  function handleClose() {
    setOuterOpen(false);
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteForeverIcon />
      </IconButton>
      <Dialog open={outerOpen} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Please confirm Circle deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Once a circle is deleted, it cannot not be recovered. Please confirm via the button below, or click cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => {
              handleClose();
              dispatch(deleteCircle(circle, auth.token));
            }}
            color='secondary'
            autoFocus
          >
            DELETE
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteCircle;
