/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { setCircleFilter, setPersonalFilter } from '../actions/index';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  option: {
    marginRight: theme.spacing(1),
  },
}));

const GroupFilterMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const circleFilter = useSelector(store => store.filters.circleArtifactFilter);
  const availableCircles = useSelector(store => store.circle.circles);
  const personalFilter = useSelector(store => store.filters.personalFilter);
  const userID = useSelector(store => store.auth.user.id);

  const cKeys = Object.keys(availableCircles);

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function isSelected(key) {
    return circleFilter.includes(key);
  }

  function handleSelect(key) {
    if (isSelected(key)) {
      dispatch(setCircleFilter(circleFilter.filter(c => c !== key)));
    } else {
      dispatch(setCircleFilter([...circleFilter, key]));
    }
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  return (
    <>
      <IconButton className={classes.button} aria-label='menu' ref={anchorRef} onClick={handleToggle}>
        <MenuIcon />
      </IconButton>
      <Popper open={open} anchorEl={anchorRef.current} keepMounted transition disablePortal className={open ? classes.button : classes.input}>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <Paper id='menu-list-grow'>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {cKeys.map(key => (
                    <MenuItem onClick={() => handleSelect(key)}>
                      <Grid container direction='row' justify='space-between'>
                        <Grid item className={classes.option}>
                          {availableCircles[key].title}
                        </Grid>
                        <Grid item className={classes.option}>
                          {isSelected(key) ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={() => dispatch(setPersonalFilter(userID))}>
                    <Grid container direction='row' justify='space-between'>
                      <Grid item className={classes.option}>
                        User Created
                      </Grid>
                      <Grid item className={classes.option}>
                        {personalFilter ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                      </Grid>
                    </Grid>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default GroupFilterMenu;
