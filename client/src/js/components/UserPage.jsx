import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  ListItemAvatar,
  Avatar,
  IconButton,
  Container,
  CardMedia,
  CardActionArea,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getVisibleArtifacts } from '../selectors/index';
import LinkIcon from '@material-ui/icons/Link';
import { Link } from 'react-router-dom';
import { setPersonalFilter, setAllFilter } from '../actions';
import ArtifactFormModal from './ArtifactFormModal';
import ArtifactModal from './ArtifactModal';
import { artifactSwitch } from '../actions/index';
import { uploadImage, updateImage } from '../actions/artifact';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  image: {
    maxWidth: '350px',
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(6),
  },
  container: {
    marginTop: theme.spacing(6),
  },
  column: {
    padding: theme.spacing(2),
  },
  textPadding: {
    marginRight: theme.spacing(3),
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(store => store.auth.user);
  const state = useSelector(store => store);
  const artifacts = getVisibleArtifacts(state);

  const availableCircles = useSelector(store => store.circle.circles);
  const cKeys = Object.keys(availableCircles);

  useEffect(() => {
    dispatch(setAllFilter(false));
    dispatch(setPersonalFilter(user.id));

    return function cleanup() {
      dispatch(setAllFilter(true));
      dispatch(setPersonalFilter(false));
      dispatch(updateImage(false));
    };
  }, [dispatch, user.id]);

  return (
    <Container maxWidth='lg'>
      <ArtifactModal />
      <ArtifactFormModal />
      <Grid container direction='row' className={classes.container}>
        <Grid item className={classes.column}>
          <Grid container direction='column'>
            <Grid item>
              <Card className={classes.image}>
                <CardActionArea>
                  {/* <label htmlFor='contained-button-file'> */}
                  <input
                    accept='image/*'
                    name='src'
                    className={classes.input}
                    id='contained-button-file'
                    type='file'
                    onChange={e => dispatch(uploadImage(e.target.files[0]))}
                  />
                  <CardMedia src='https://avatars2.githubusercontent.com/u/12298202?v=3&s=400' component='img'></CardMedia>
                  {/* </label> */}
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Typography variant='h5'>Your Details</Typography>
              <List>
                <ListItem key='name'>
                  <ListItemText primary='Name' secondary={user.firstname + ' ' + user.lastname} />
                </ListItem>
                <ListItem key='username'>
                  <ListItemText primary='Username' secondary={user.username} />
                </ListItem>
                <ListItem key='email'>
                  <ListItemText primary='Email' secondary={user.email} />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item className={classes.column}>
            <Typography gutterBottom variant='h3'>
              {user.firstname + " 's Admin Page "}
            </Typography>
          </Grid>
          <Grid container direction='column'>
            <Grid item>
              <Typography gutterBottom variant='h6'>
                Your Circles
              </Typography>
            </Grid>
            <List>
              {cKeys.map(key => (
                <ListItem key={key}>
                  <ListItemAvatar>
                    <Avatar src={availableCircles[key].previewImage} alt={availableCircles[key].title}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={availableCircles[key].title}
                    secondary={availableCircles[key].description + '      '}
                    className={classes.textPadding}
                  />
                  <ListItemSecondaryAction>
                    <IconButton component={Link} to={'/circle/' + key}>
                      <LinkIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Grid item>
              <Typography gutterBottom variant='h6'>
                Artifacts you've uploaded
              </Typography>
              {artifacts.map(artifact => (
                <ListItem key={artifact}>
                  <ListItemAvatar>
                    <Avatar src={artifact.src} alt={artifact.title}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={artifact.title}
                    secondary={artifact.desc.slice(0, Math.min(artifact.desc.length, 35)) + '...'}
                    className={classes.textPadding}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => dispatch(artifactSwitch(artifact))}>
                      <LinkIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
