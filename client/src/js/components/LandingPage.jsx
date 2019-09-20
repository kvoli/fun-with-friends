import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography, List, ListItemText, ListItem, Grid, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { rotateIn, bounce, rollIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { imageLogo, downloadLogo, communityLogo, shareLogo } from '../../SVG/SVGImages';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    height: '100%',
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    marginBottom: 20,
    paddingBottom: 20,
    marginTop: 15,
    paddingTop: 15,
    padding: theme.spacing(0.75, 2.5, 0),
  },
  subtitle: {
    flexGrow: 1,
    marginBottom: 20,
    paddingBottom: 20,
    marginTop: 10,
    paddingTop: 10,
    paddingRight: 10,
    padding: theme.spacing(0, 2.5, 0),
  },
  header: {
    maxHeight: 450,
  },
  image: {
    flexGrow: 1,
    height: 400,
    width: 400,
    paddingRight: 10,
    marginLeft: 200,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subImage: {
    flexGrow: 1,
    height: 60,
    width: 60,
    marginLeft: 100,
    paddingLeft: 10,
    marginTop: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const animationStyles = {
  rotateIn: {
    animation: '20s',
    animationName: Radium.keyframes(rotateIn, 'rotateIn'),
  },
  bounce: {
    animation: '5s',
    animationName: Radium.keyframes(bounce, 'bounce'),
  },
  rollIn: {
    animation: '5s',
    animationName: Radium.keyframes(rollIn, 'rollIn'),
  },
};

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth='lg' justify='space-between' style={useStyles.container}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} align='center'>
            <Typography variant='h1' className={classes.title}>
              Fun. With. Friends.
            </Typography>
            <FormGroup row>
              <StyleRoot>
                <img src={imageLogo} alt='' style={animationStyles.rotateIn} className={classes.image} />
              </StyleRoot>
              <List>
                <ListItem>
                  <FormGroup row>
                    <img src={downloadLogo} alt='' className={classes.subImage} />
                    <ListItemText align='center'>
                      <Typography className={classes.subtitle} variant='h4'>
                        Upload Your Artifacts.
                      </Typography>
                    </ListItemText>
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup row>
                    <img src={shareLogo} alt='' className={classes.subImage} />
                    <ListItemText>
                      <Typography className={classes.subtitle} variant='h4'>
                        Share With Friends.
                      </Typography>
                    </ListItemText>
                  </FormGroup>
                </ListItem>
                <ListItem>
                  <FormGroup row>
                    <img src={communityLogo} alt='' className={classes.subImage} />
                    <ListItemText>
                      <Typography className={classes.subtitle} variant='h4'>
                        Create Your Community.
                      </Typography>
                    </ListItemText>
                  </FormGroup>
                </ListItem>
              </List>
            </FormGroup>
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
  );
};

export default LandingPage;
