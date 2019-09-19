import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        Fun With Friends
      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
        kvoli - dezyh - ambient004 - alanlewis764
      </Typography>
      <Copyright />
    </footer>
  );
}

export default Footer;
