import React from 'react';
import useForm from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, CardActionArea, Typography, Switch, CardMedia, Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';
import uuid from 'uuid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddCircleMembers from './AddCircleMembers';
import { uploadImage } from '../actions/artifact';
import { addCircle, openCircleForm } from '../actions/circle';

// const circleImages = [
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-gif-300x300-200kb-9.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-5.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-10.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-good-morning-gif-8.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-9.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-4.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-3.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-2.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-1.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-6.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-7.gif',
//   'https://gifimage.net/wp-content/uploads/2017/09/anime-girl-angry-gif-11.gif',
// ];

// const selectRandom = () => {
//   return circleImages[Math.floor(Math.random() * circleImages.length) - 1];
// };

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
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
  cardMedia: {
    maxHeight: 500,
    maxWidth: 500,
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
  inputBox: {
    spacing: theme.spacing(2),
  },
  inputField: {
    margin: theme.spacing(2),
  },
  switchSpacing: {
    margin: theme.spacing(4),
  },
  memberSelect: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  bottom: {
    flex: 1,
    marginBottom: '36',
  },
}));

const getID = user => {
  return user[0].id;
};

const getUserID = (userlist, username) => {
  return getID(userlist.filter(user => user.username === username));
};

const mapUserNameToID = (userlist, usernames) => {
  // handle if usernames is undefined (for whatever reason)
  if (!usernames) {
    return [];
  }
  return usernames.map(username => getUserID(userlist, username));
};

function getSteps() {
  return ['Circle Information', 'Customise Your Circle', 'Circle Permissions', 'Privacy'];
}

const AddCircle = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const steps = getSteps();
  // const randomPreview = selectRandom();

  const user = useSelector(store => store.auth.user);
  const token = useSelector(store => store.auth.token);
  const circle = useSelector(store => store.circle.circleForm.circle);
  const pictureSrc = useSelector(store => store.focusView.artifactImageUpload);
  const allUsers = useSelector(store => store.user);

  const [currentMembers, setCurrentMembers] = React.useState();
  const [currentAdmins, setCurrentAdmins] = React.useState([user.username]);
  const [circlePublic, setCirclePublic] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const fillcircle = {
    title: circle ? circle.title : '',
    description: circle ? circle.desc : '',
    text: circle ? circle.text : '',
    date: circle ? circle.date : '',
    src: '',
    id: circle ? circle.id : uuid.v4(),
    previewImage: circle ? circle.previewImage : '',
    members: circle ? circle.members : [],
    admins: circle ? circle.admins : [],
    artifacts: circle ? circle.artifacts : [],
    public: circle ? circle.public : false,
  };

  const defaultImage = 'https://www.spiritdental.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';

  const { register, handleSubmit } = useForm({
    defaultValues: fillcircle,
  });

  const onSubmit = (data, e) => {
    // ensure form data is converted back to a bool
    data.public = data.public === 'true' || data.public === true;
    dispatch(
      addCircle(
        {
          ...data,
          admins: mapUserNameToID(allUsers, currentAdmins),
          members: mapUserNameToID(allUsers, currentMembers),
          artifacts: [],
        },
        token
      )
    );
    e.preventDefault();
    e.target.reset();
    dispatch(openCircleForm(false));
  };

  return (
    <Card className={classes.card}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input readOnly className={classes.input} ref={register({ required: true })} name='id' value={circle ? circle.id : uuid.v4()} />
        <input readOnly className={classes.input} ref={register({ required: true })} name='public' value={circlePublic} />
        <input readOnly className={classes.input} ref={register({ required: true })} name='previewImage' value={pictureSrc || defaultImage} />
        <input readOnly className={classes.input} ref={register({ required: true })} name='text' value='placeholder text' />
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <CardContent className={classes.cardContent}>
          <Grid container direction='column' className={activeStep === 0 ? classes.inputBox : classes.input}>
            <Grid item>
              <Typography variant='h6'>Enter a name for your Circle</Typography>
            </Grid>
            <Grid item>
              <TextField name='title' label='Circle Name' inputRef={register({ required: true })} placeholder='Smith Inner Circle' variant='outlined' />
            </Grid>
            <Grid item>
              <Typography variant='h6'>Enter a description for your Circle</Typography>
            </Grid>
            <Grid item>
              <TextField
                name='description'
                label='Circle Description'
                inputRef={register({ required: true })}
                placeholder='For the John, Jane, Boy & Girl. Our Close Family'
                rows='2'
                margin='normal'
                variant='outlined'
                multiline
                fullWidth
                defaultValue={fillcircle.description || ''}
              />
            </Grid>
          </Grid>
          <Grid container direction='column' justify='center' alignItems='center' className={activeStep === 1 ? classes.inputBox : classes.input}>
            <Grid item>
              <Typography variant='h5'>Click on the image below to upload a preview image for your circle</Typography>
            </Grid>
            <Grid item>
              <CardActionArea>
                <label htmlFor='contained-button-file'>
                  <input
                    accept='image/*'
                    name='src'
                    className={classes.input}
                    id='contained-button-file'
                    type='file'
                    onChange={e => dispatch(uploadImage(e.target.files[0]))}
                  />
                  <CardMedia
                    component='img'
                    className={classes.cardMedia}
                    image={pictureSrc || defaultImage}
                    alt={pictureSrc || defaultImage}
                    src={pictureSrc || defaultImage}
                  />
                </label>
              </CardActionArea>
            </Grid>
          </Grid>
          <Grid container direction='column' justify='center' alignItems='stretch' className={activeStep === 2 ? classes.inputBox : classes.input}>
            <Grid container direction='column' justify='center' alignItems='stretch' className={classes.memberSelect}>
              <Grid item>
                <Typography variant='h6'>Select members to join your circle</Typography>
              </Grid>
              <Grid item>
                <AddCircleMembers field={currentMembers} setField={setCurrentMembers} label='enter members username' name='members' />
              </Grid>
            </Grid>
            <Grid container direction='column' justify='center' alignItems='stretch' className={classes.memberSelect}>
              <Grid item>
                <Typography variant='h6'>Select admins to join your circle</Typography>
              </Grid>
              <Grid item>
                <AddCircleMembers field={currentAdmins} setField={setCurrentAdmins} label='enter admins username' name='admins' />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='column' justify='flex-start' alignItems='stretch' className={activeStep === 3 ? classes.inputBox : classes.input}>
            <Grid item>
              <Typography variant='h5'>Set Circle Privacy Restrictions.</Typography>
              <Typography color='textSecondary'>note that public groups are viewable by all current fun with friends registered members</Typography>
            </Grid>
            <Grid container direction='row' justify='center' alignItems='center'>
              <Grid item>
                <Switch checked={circlePublic} onChange={() => setCirclePublic(!circlePublic)} value={circlePublic} className={classes.switchSpacing} />
              </Grid>
              <Grid item>
                {circlePublic ? (
                  <Typography color='error' variant='button'>
                    Public
                  </Typography>
                ) : (
                  <Typography color='primary' variant='button'>
                    Private
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction='row-reverse' className={classes.bottom}>
            {activeStep === steps.length - 1 ? (
              <Grid item>
                <input name='submit' type='submit' className={classes.input} />
                <Button variant='contained' color='primary' type='submit'>
                  <SaveIcon />
                  Save
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Next
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default AddCircle;
