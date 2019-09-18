import React from 'react';
import { Container, Grid, Typography, Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4)
  },
  bigAvatar: {
    margin: 15,
    width: 200,
    height: 200
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const GroupIndex = () => {
  const circles = useSelector(store => store.circles.circles);
  const classes = useStyles();
  const circleKeys = Object.keys(circles);
  console.log(circles);
  const publicKeys = circleKeys.filter(key => circles[key].public === true)
  const privateKeys = circleKeys.filter(key => circles[key].public === false)

  return (
    <Container maxWidth="lg" justify="space-between">
      <Grid container direction="column">
        <Grid item className={classes.container}>
          <Typography gutterButtom variant="h3" component="h1" cent>
            Your Circles
          </Typography>
          <Grid container>
            {privateKeys.map(key => (
              <Grid item>
                <IconButton component={Link} to={'/circle/' + key}>
                  <Avatar
                    alt={circles[key].title}
                    src={circles[key].previewImage}
                    className={classes.bigAvatar}
                  ></Avatar>
                </IconButton>
                <Typography align="center">{circles[key].title}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item className={classes.container}>
          <Typography gutterButtom variant="h3" component="h2" cent>
            Public Circles
          </Typography>
          <Grid container>
            {publicKeys.map(key => (
              <Grid item>
                <IconButton component={Link} to={'/circle/' + key}>
                  <Avatar
                    alt={circles[key].title}
                    src={circles[key].previewImage}
                    className={classes.bigAvatar}
                  ></Avatar>
                </IconButton>
                <Typography align="center">{circles[key].title}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GroupIndex;
