import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { teal } from '@material-ui/core/colors';
import { NavProfile } from './NavProfile';

const useStyles = makeStyles(theme => ({
  navBar: {
    flexGrow: 1,
    backgroundColor: teal[600],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.navBar} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Artifact Register
          </Typography>
          <NavProfile />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};