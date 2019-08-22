import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Divider } from "@material-ui/core";


const ArtifactModal = props => {

  const [open, setOpen] = React.useState(true);
 
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <img src={props.artifact.src} />
          <div className>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {props.artifact.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="body2">
                  Sep 2, 1922
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary" variant="body2">
              {props.artifact.text} that shouldn't be too long hopefully, but you never know.
            </Typography>
          </div>
          <Divider variant="middle" />
          <div  >
            <Grid container allignItems="center">
              {props.artifact.tags.map(tag => (
                <Grid item>
                  <Chip label={tag.label} />
                </Grid>
              ))}
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ArtifactModal;