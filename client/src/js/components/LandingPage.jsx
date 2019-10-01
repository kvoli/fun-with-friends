import React from 'react';
import { Typography, Grid, Card, ListItem, CardMedia, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { downloadLogo, communityLogo, shareLogo } from '../../SVG/SVGImages';
import { backgroundAnimation } from '../../VIDEO/VIDEOFiles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 10,
    marginTop: 40,
  },
  gridListIcon: {
    width: 400,
    height: 400,
    transform: 'translateZ(0)',
  },
  container: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    height: '100%',
    display: 'flex',
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    background: '#484c69',
    height: '66%',
  },
  backgroundAnimation: {
    height: '600px',
    width: '100%',
    overflow: 'hidden',
    textIndent: '30%',
  },
  card: {
    position: 'relative',
    backgroundColor: '#3e4360',
  },
  overlay: {
    position: 'absolute',
    top: '40%',
    left: '25%',
    color: 'White',
    backgroundColor: 'transparent',
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Grid container direction='column' xs={16} spacing={8} alignItems='stretch'>
      <Grid item>
        <Card className={classes.card}>
          <CardMedia component='video' className={classes.backgroundAnimation} video={backgroundAnimation} src={backgroundAnimation} />
          <div className={classes.overlay}>
            <Typography variant='h1' align='center'>
              FUN WITH FRIENDS
            </Typography>
          </div>
        </Card>
      </Grid>
      <Grid item>
        <Grid container alignItems='flex-start' justify='space-around'>
          <Grid item xs={3} alignContent='center'>
            <List>
              <ListItem>
                <Typography variant='h3' align='center' color='#3e4360'>
                  Upload Your Artifacts
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  Take a photo of your artifacts that you would like to share with your friends and family. Follow the user-friendly artifact form to add
                  details and descriptions of the artifact. Once you have added all the information that you want,share it with your community!
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  You are able to upload as many artifacts as you like, and choose who can view the artifacts that you have uploaded. If you do not have a
                  photo, no problem, you can simply leave a description of the artifact without can image.
                </Typography>
              </ListItem>
              <ListItem>
                <img src={downloadLogo} alt='' width='100%' height='100%' />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} alignContent='center'>
            <List>
              <ListItem>
                <Typography variant='h3' align='center' color='#3e4360'>
                  Share With Friends
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  Choose the people that you want to view your artifact. By creating your own circle, you can share your artifacts with only the people that you
                  want to view them. As the admin of the circle that you create, you can add friends and family, allowing them to view the artifacts that you
                  have uploaded.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  You can also view the artifacts of friends and family who have added you to their circle. Therefore you can share your artifacts with the
                  people that you choose to share them with.
                </Typography>
              </ListItem>
              <ListItem>
                <img src={shareLogo} alt='' width='100%' height='100%' text-align='center' />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={3} alignContent='center'>
            <List>
              <ListItem>
                <Typography variant='h3' align='center' color='#3e4360'>
                  Create Your Community
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  Through the cirlce page, you have follow the easy steps which will allow you to create your very own circle. You will become the admin of the
                  circle that you create, which will allow you to choose the people who can view and upload artifacts in the circle. This allows you to create
                  your very own community of people who can share artifacts together!
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant='body1' color='#3e4360'>
                  You can choose to make your circle public, giving any user the ability to join the circle, or private, giving the circle admins the choice
                  over who can join the circle.
                </Typography>
              </ListItem>
              <ListItem alignItems='center'>
                <img src={communityLogo} alt='' width='100%' height='100%' text-align='center' />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
