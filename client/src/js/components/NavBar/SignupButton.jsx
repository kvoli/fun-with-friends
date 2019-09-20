import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  signupButton: {
    minWidth: 60,
    maxWidth: 90,
    marginLeft: 5,
    marginRight: 5,
  },
}));

const SignupButton = () => {
  const classes = useStyles();
  const auth = useSelector(store => store.auth);
  // Do not render the SignupButton if the user is already authenticated
  if (auth.success) return null;
  // Otherwise render the SignupButton
  return (
    <Button component={Link} to='/signup' variant='outlined' color='inherit' className={classes.signupButton}>
      Signup
    </Button>
  );
};

export default SignupButton;
