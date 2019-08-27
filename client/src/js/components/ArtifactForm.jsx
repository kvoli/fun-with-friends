import React from "react";
import uuidv1 from "uuid";
import useForm from "react-hook-form";
import { addArtifact } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { TextField, FormGroup, FormLabel, Input, Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Card, CardContent, Divider, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeletePopup from "./DeletePopup";
import LoadingCircle from "./LoadingCircle";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5)
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    "&:last-child": {
      paddingBottom: 6
    }
  },
  cardMedia: {
    height: '100%',
    width: '100%'
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25)
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


const ArtifactForm = () => {

  const classes = useStyles();

  const artifact = useSelector(store => store.focusView.artifactFormView.artifact)
  const dispatch = useDispatch();


  const fillArtifact = artifact ? artifact : {
    title: "",
    desc: "",
    text: "",
    date: "",
    origin: "",
    tags: "",
    src: "",
  }

  const { register, handleSubmit } = useForm({
    defaultValues: fillArtifact
  });

  const stockImage = "https://www.logolynx.com/images/logolynx/2a/2a71ec307740510ce1e7300904131154.png"

  const onSubmit = (data, e) => { dispatch(addArtifact(data)) }

  return (
    <Grid container justify="center" className={classes.contained}>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
          />
          <CardMedia
            component='img'
            className={classes.cardMedia}
            image={artifact ? artifact.src : stockImage}
            alt={artifact ? artifact.src : stockImage}
          />
          <CardContent className={classes.cardContent}>
            <div className={classes.cardText}>
              <Grid container justify="space-between">
                <Grid item >
                  <TextField
                    name="title"
                    label="title"
                    ref={register({ required: true })}
                    placeholder="Grandma's Teeth"
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="row-reverse" justify="flex-end">
                    <Grid item>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                      />
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                          Upload
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="space-between" >
                  <Grid item>
                    <TextField
                      name="date"
                      label="date"
                      ref={register({ required: true })}
                      placeholder="3/9/1997"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="origin"
                      label="origin"
                      ref={register({ required: true })}
                      placeholder="e.g. United Kingdom"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid direction="row" justify="right container"></Grid>
                <Grid item>
                  <TextField
                    name="tags"
                    label="tags"
                    ref={register}
                    placeholder="Antique, Family, Old ..."
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item>
                <TextField
                  name="desc"
                  label="summary"
                  ref={register({ required: true })}
                  placeholder="A short summary"
                  rows="2"
                  margin="normal"
                  variant="outlined"
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  rows="6"
                  variant="outlined"
                  margin="normal"
                  multiline
                  fullWidth
                  name="text"
                  label="text"
                  ref={register({ required: true })}
                  palceholder="A detailed description "
                />
              </Grid>
              <Grid>
                <input type="submit" className={classes.input} />
              </Grid>
            </div>
          </CardContent>
        </form>
      </Card>
    </Grid>
  )
}



export default ArtifactForm;