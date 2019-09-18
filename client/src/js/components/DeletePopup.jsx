import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { artifactSwitch } from '../actions/index';
import { deleteArtifact } from '../actions/artifact';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { launchDeleteSnackbar } from '../actions/snackbar';

const AlertDialog = () => {
  const dispatch = useDispatch();
  const artifact = useSelector(store => store.focusView.artifactDetailView.artifact);
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
        <DeleteIcon color='secondary' fontSize='default' />
      </IconButton>
      <Dialog open={outerOpen} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Please confirm artifact deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Once the artifact is removed from the register, it cannot not be recovered. Please confirm via the button below, or click cancel.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={event => {
              handleClose();
              dispatch(launchDeleteSnackbar());
              dispatch(deleteArtifact(artifact, auth.token));
              dispatch(artifactSwitch(false));
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

export default AlertDialog;
