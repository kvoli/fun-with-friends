import React from 'react';
import Container from '@material-ui/core/Container';
import { circleImage } from '../../SVG/SVGImages';
import {
  Typography,
  List,
  ListItemText,
  ListItem,
  Grid,
  FormGroup
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { rotateIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    height: '100%',
    display: 'flex'
  },
  title: {
    flexGrow: 1,
    marginBottom: 1,
    paddingBottom: 20,
    padding: theme.spacing(0.75, 2.5, 0)
  },
  subtitle: {
    flexGrow: 1,
    marginBottom: 20,
    paddingBottom: 20,
    paddingRight: 10,
    padding: theme.spacing(0, 2.5, 0)
  },
  header: {
    maxHeight: 450
  },
  image: {
    flexGrow: 1,
    height: 400,
    width: 400,
    paddingRight: 10
  }
}));

const animationStyles = {
  rotateIn: {
    animation: 'x 5s',
    animationName: Radium.keyframes(rotateIn, 'rotateIn')
  }
};

const LandingPage = () => {
  const classes = useStyles();

  return (
    <Container
      className={classes.container}
      maxWidth="lg"
      justify="space-between"
      style={useStyles.container}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h1" className={classes.title}>
            Fun. With. Friends.
          </Typography>
          <div align="right">
            <FormGroup row>
              <div>
                <StyleRoot>
                  <img
                    src={circleImage}
                    alt=""
                    style={animationStyles.rotateIn}
                    className={classes.image}
                  />
                </StyleRoot>
              </div>
              <div>
                <List>
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.subtitle} variant="h4">
                        Upload Your Artifacts.
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.subtitle} variant="h4">
                        Share With Friends.
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Typography className={classes.subtitle} variant="h4">
                        Create Your Community.
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </FormGroup>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
