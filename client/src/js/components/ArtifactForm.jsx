/* eslint-disable no-unused-expressions */
import React from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CardActionArea, CardActions, CardMedia, Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import uuid from 'uuid';
import { openArtifactForm } from '../actions/index';
import { addCircleArtifact } from '../actions/circle';
import { uploadImage, createArtifact, editArtifact } from '../actions/artifact';
import SuggestInput from './SuggestInput';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5),
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    '&:last-child': {
      paddingBottom: 6,
    },
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(0.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  cardMedia: {
    maxHeight: '300px',
    maxWidth: 'initial',
    overflow: 'hidden',
    textIndent: '30%',
  },
}));

const ArtifactForm = () => {
  const classes = useStyles();
  const artifact = useSelector(store => store.focusView.artifactFormView.artifact);
  const auth = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const pictureSrc = useSelector(store => store.focusView.artifactImageUpload);
  const allCircles = useSelector(store => store.circle.circles);
  const cKeys = Object.keys(allCircles);
  const editMode = !!artifact;

  const fillArtifact = {
    title: artifact.title ? artifact.title : '',
    desc: artifact.desc ? artifact.desc : '',
    text: artifact.text ? artifact.text : '',
    date: artifact.date ? artifact.date : '',
    origin: artifact.origin ? artifact.origin : '',
    tags: artifact.tags ? artifact.tags : '',
    src: pictureSrc,
    id: artifact.id ? artifact.id : uuid.v4(),
  };

  const currentCircleIDs = cKeys.filter(key => allCircles[key].artifacts.includes(fillArtifact.id));
  const currentCircleNames = currentCircleIDs.map(key => allCircles[key].title);
  const availableCircleIDs = cKeys.filter(
    key => allCircles[key].members.includes(auth.user.id) || allCircles[key].admins.includes(auth.user.id) || allCircles[key].public === true
  );
  const availableCircleNames = availableCircleIDs.map(key => allCircles[key].title);

  function getCircleID(circleTitle) {
    return cKeys.filter(key => allCircles[key].title === circleTitle);
  }

  const [circles, setCircles] = React.useState(currentCircleNames || []);

  const defaultImage = 'https://www.spiritdental.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

  const { register, handleSubmit } = useForm({
    defaultValues: fillArtifact,
    nativeValidation: true,
  });

  const onSubmit = (data, e) => {
    editMode ? dispatch(editArtifact(data, auth.token)) : dispatch(createArtifact(data, auth.token));
    for (let i = 0; i < circles.length; i += 1) {
      const circleID = getCircleID(circles[i]);
      const artifactID = data.id;
      dispatch(addCircleArtifact(circleID, artifactID, auth.token));
    }
    e.target.reset();
  };

  return (
    <Grid container justify='center' className={classes.contained}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input readOnly className={classes.input} ref={register({ required: true })} name='src' value={pictureSrc || defaultImage} />
          <input readOnly className={classes.input} ref={register({ required: true })} name='id' value={artifact.id ? artifact.id : uuid.v4()} />
          <CardActionArea>
            <CardMedia
              component='img'
              className={classes.cardMedia}
              image={pictureSrc || defaultImage}
              alt={pictureSrc || defaultImage}
              src={pictureSrc || defaultImage}
            />
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardText}>
              <Grid container justify='space-between'>
                <Grid item>
                  <TextField
                    name='title'
                    label='title'
                    inputRef={register({ required: 'please enter a title' })}
                    placeholder="Grandma's Teeth"
                    defaultValue={fillArtifact.title || ''}
                  />
                </Grid>
                <Grid item>
                  <Grid container direction='row-reverse' justify='flex-end'>
                    <Grid item>
                      <label htmlFor='contained-button-file'>
                        <input
                          accept='image/*'
                          name='imageUpload'
                          className={classes.input}
                          id='contained-button-file'
                          type='file'
                          onChange={e => dispatch(uploadImage(e.target.files[0]))}
                        />
                        <Button variant='contained' component='span' className={classes.button}>
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction='row' justify='space-between'>
                  <Grid item>
                    <TextField
                      name='date'
                      label='date'
                      inputRef={register({ required: 'please enter a date' })}
                      placeholder='3/9/1997'
                      defaultValue={fillArtifact.date || ''}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name='origin'
                      label='origin'
                      inputRef={register({ required: 'please enter an origin' })}
                      placeholder='e.g. United Kingdom'
                      defaultValue={fillArtifact.origin || ''}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  name='tags'
                  label='tags'
                  inputRef={register}
                  placeholder='Antique, Family, Old ...'
                  fullWidth
                  defaultValue={fillArtifact.tags || ''}
                />
              </Grid>
              <Grid item>
                <TextField
                  name='desc'
                  label='summary'
                  inputRef={register({ required: 'please enter a short description' })}
                  placeholder='A short summary'
                  rows='2'
                  margin='normal'
                  variant='outlined'
                  multiline
                  fullWidth
                  defaultValue={fillArtifact.desc || ''}
                />
              </Grid>
              <Grid item>
                <TextField
                  rows='6'
                  variant='outlined'
                  margin='normal'
                  multiline
                  fullWidth
                  name='text'
                  label='text'
                  inputRef={register}
                  palceholder='A detailed description '
                  defaultValue={fillArtifact.text || ''}
                />
              </Grid>
              <Grid item>
                <SuggestInput field={circles} setField={setCircles} label='share with circles' name='circles' suggestionList={availableCircleNames} />
              </Grid>
              <Grid />
            </div>
          </CardContent>
          <CardActions>
            <Grid container direction='row-reverse'>
              <Grid item>
                <input name='submit' type='submit' className={classes.input} />
                <Button variant='contained' color='primary' size='small' className={classes.button} type='submit'>
                  <SaveIcon />
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  name='cancel'
                  className={classes.button}
                  onClick={() => {
                    dispatch(openArtifactForm(false));
                  }}
                >
                  <CancelIcon />
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </Grid>
  );
};

export default ArtifactForm;
