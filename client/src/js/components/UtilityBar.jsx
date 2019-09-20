import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { openArtifactForm } from '../actions/index';
import { getArtifacts } from '../actions/artifact';
import SearchBar from './SearchBar';
import GroupFilterMenu from './GroupFilterMenu';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const UtilityBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item>
        <div>
          <IconButton onClick={() => dispatch(openArtifactForm(false))} className={classes.button} aria-label='add'>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(getArtifacts(auth.token))} className={classes.button} aria-label='refresh'>
            <RefreshIcon />
          </IconButton>
          <GroupFilterMenu />
        </div>
      </Grid>
    </Grid>
  );
};

export default UtilityBar;
