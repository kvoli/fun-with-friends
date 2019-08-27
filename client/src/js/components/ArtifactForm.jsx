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

  const onSubmit = (data, e) => { dispatch(addArtifact(data)) }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="imageUpload">
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
      </div>
      <TextField
        name="title"
        label="title"
        ref={register({ required: true })}
        placeholder="Grandma's Teeth"
      />
      <TextField
        name="desc"
        label="desc"
        ref={register({ required: true })}
        placeholder="A long description"
      />
      <TextField
        name="text"
        label="text"
        ref={register({ required: true })}
        placeholder="lots of stuff"
      />
      <TextField
        name="date"
        label="date"
        ref={register({ required: true })}
        placeholder="3/9/1997"
      />
      <TextField
        name="origin"
        label="origin"
        ref={register({ required: true })}
        placeholder="USA"
      />
      <TextField
        name="tags"
        label="tags"
        ref={register}
        placeholder="USA"
      />
      <TextField
        name="src"
        label="src"
        ref={register({ required: true })}
        placeholder="USA"
      />
      <input type="submit" />
    </form>
  )
}


export default ArtifactForm;