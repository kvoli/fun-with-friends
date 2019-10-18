import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { signup } from '../actions/auth';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {},
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function validateUsername(name) {
  return typeof name !== undefined && name.length > 0 && name.match(/^[a-zA-Z0-9]*$/);
}

function validatePassword(password) {
  return typeof password !== undefined && password.length > 5;
}

function validateEmail(email) {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  return email.match(pattern) && email.length > 3;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ firstname: true, lastname: true, email: true, username: true, password: true });

  function submit() {
    setErrors({
      firstname: validateUsername(firstname),
      lastname: validateUsername(lastname),
      email: validateEmail(email),
      username: validateUsername(username),
      password: validatePassword(password),
    });
    console.log(errors);
    if (validateEmail(email) && validatePassword(password) && validateUsername(firstname) && validateUsername(lastname) && validateUsername(username)) {
      dispatch(signup(firstname, lastname, email, username, password));
    }
  }

  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!errors.firstname}
                onChange={e => {
                  setFirstname(e.target.value);
                }}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                helperText={errors.firstname ? '' : 'Please enter your first name'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={!errors.lastname}
                onChange={e => {
                  setLastname(e.target.value);
                }}
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                helperText={errors.lastname ? '' : 'Please enter your last name'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!errors.email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                helperText={errors.email ? '' : 'Please enter a valid email address'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!errors.username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
                variant='outlined'
                required
                fullWidth
                id='username'
                label='username'
                name='username'
                autoComplete='username'
                helperText={errors.username ? '' : 'Please enter a valid username (a-z, A-z, 0-9) only'}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={!errors.password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                helperText={errors.password ? '' : 'Password must be longer than 5 characters'}
              />
            </Grid>
          </Grid>
          <Button
            onClick={() => {
              submit();
            }}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
