import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Main from './Main';
import NavBar from './NavBar/NavBar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'column',
    minHeight: '100vh',
    display: 'flex',
  },
  main: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
  header: {
    maxHeight: '100px',
  },
  phantom: {
    display: 'flex',
    flex: 1,
    flexGrow: 1,
  },
}));

const App = () => {
  const dark = useSelector(store => store.focusView.dark);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={dark ? THEME : null}>
        <CssBaseline />
        <NavBar />
        <Main className={classes.main} />
        <div className={classes.phantom} />
        <Footer className={classes.footer} />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
