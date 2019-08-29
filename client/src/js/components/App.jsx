import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './Main';
import NavBar from './NavBar/NavBar';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Main />
    </React.Fragment>
  );
}

export default App;
