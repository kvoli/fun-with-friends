import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  loginButton: {
    minWidth: 60,
    maxWidth: 90,
    marginLeft: 5,
    marginRight: 5,
  },
}));

const LoginButton = () => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);
  // Do not render the LoginButton if the user is already authenticated
  if (auth.success) return null;
  // Otherwise render the LoginButton
  return (
    <Button component={Link} to='/login' variant='outlined' color='inherit' className={classes.loginButton}>
      Login
    </Button>
  );
};

export default LoginButton;
