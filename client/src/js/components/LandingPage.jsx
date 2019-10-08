import React from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LandingAnimatedBackground from './LandingAnimatedBackground';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  title: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: 'white',
  },
  titleBackground: {
    position: 'relative',
    width: '100%',
    height: 500,
  },
  fakeTop: {
    height: 500,
    position: 'relative',
    zIndex: -1,
  },
  gridTop: {
    width: '100%',
    height: 500,
    position: 'absolute',
    padding: 0,
    margin: 0,
  },
  gridBottom: {
    position: 'relative',
  },
  container: {
    height: '100%',
  },
  infoBox: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
  },
  infoBoxHeadingContainer: {
    display: 'block',
  },
  icons: {
    height: 175,
    width: 175,
    margin: 4,
    color: '#3e4360',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item className={classes.gridTop}>
        <div className={classes.titleBackground}>
          <LandingAnimatedBackground />
        </div>
        <div className={classes.title}>
          <Typography align='center' variant='h1'>
            Fun With Friends
          </Typography>
        </div>
      </Grid>
      <div className={classes.fakeTop} />
      <Grid item className={classes.gridBottom}>
        <Grid container alignItems='flex-start' justify='space-around' alignContent='center'>
          <Grid item xs={12} sm={9} md={4} lg={3} className={classes.infoBox}>
            <Grid container alignItems='center' justify='center'>
              <Grid item>
                <CloudUploadIcon className={classes.icons} />
              </Grid>
            </Grid>
            <List>
              <ListItem className={classes.infoBoxHeadingContainer}>
                <Typography variant='h5' align='center'>
                  Upload Your Artifacts
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Use the user-friendly artifact form to add relevent details such as a title, description and date to the artifact.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  You can also upload a photo of your artifact or simply leave it blank and a default image will be choosen for you.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  You are able to upload as many artifacts as you like, and choose who can view each of the artifacts you have uploaded.
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={9} md={4} lg={3} className={classes.infoBox}>
            <Grid container alignItems='center' justify='center'>
              <Grid item>
                <GroupWorkIcon className={classes.icons} />
              </Grid>
            </Grid>
            <List>
              <ListItem className={classes.infoBoxHeadingContainer}>
                <Typography variant='h5' align='center'>
                  Create Your Circles
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Simply create a community circle via the circles page to share artifacts privately with members of that circle.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Circles are based on a two level privilage system of admins and members. Admins can add and remove members while everyone can add and view
                  artifacts.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Circles are private by default, meaning you must be invited to a circle by an admin but can also be made public, allowing any user the ability
                  to see and join the circle.
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={9} md={4} lg={3} className={classes.infoBox}>
            <Grid container alignItems='center' justify='center'>
              <Grid item>
                <EmojiPeopleIcon className={classes.icons} />
              </Grid>
            </Grid>
            <List>
              <ListItem className={classes.infoBoxHeadingContainer}>
                <Typography variant='h5' align='center'>
                  Share With Friends
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Share your artifacts only with the friends and family that you want to be able to view your artifacts through the use of circles.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  You can also view the artifacts of friends and family who have added you to their circles or made their artifacts public.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' align='center'>
                  Get started sharing artifacts with your family and friends by signing up for an account in the top right.
                </Typography>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
