import React from 'react';
import { Container, Grid, Typography, Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { openCircleForm } from '../actions/circle';
import AddCircleModal from './AddCircleModal';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
  },
  bigAvatar: {
    margin: 15,
    width: 200,
    height: 200,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const GroupIndex = () => {
  const dispatch = useDispatch();
  const circles = useSelector(store => store.circle.circles);
  const classes = useStyles();

  const circleKeys = Object.keys(circles);

  const publicKeys = circleKeys.filter(key => circles[key].public === true || circles[key].public === 'true');
  const privateKeys = circleKeys.filter(key => circles[key].public === false || circles[key].public === 'false');

  return (
    <React.Fragment>
      <Container maxWidth='lg' justify='space-between'>
        <Grid container direction='column'>
          <Grid item className={classes.container}>
            <Typography variant='h3' component='h1'>
              Your Circles
            </Typography>
            <Grid container>
              {privateKeys.map(key => (
                <Grid item key={key}>
                  <IconButton component={Link} to={'/circle/' + key}>
                    <Avatar alt={circles[key].title} src={circles[key].previewImage} className={classes.bigAvatar}></Avatar>
                  </IconButton>
                  <Typography align='center'>{circles[key].title}</Typography>
                </Grid>
              ))}
              <Grid item>
                <IconButton onClick={() => dispatch(openCircleForm({ circle: false }))}>
                  <AddCircleIcon className={classes.bigAvatar} />
                </IconButton>
                <Typography align='center'>Create New Circle</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.container}>
            <Typography variant='h3' component='h2'>
              Public Circles
            </Typography>
            <Grid container>
              {publicKeys.map(key => (
                <Grid item key={key}>
                  <IconButton component={Link} to={'/circle/' + key}>
                    <Avatar alt={circles[key].title} src={circles[key].previewImage} className={classes.bigAvatar}></Avatar>
                  </IconButton>
                  <Typography align='center'>{circles[key].title}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <AddCircleModal />
    </React.Fragment>
  );
};

export default GroupIndex;
