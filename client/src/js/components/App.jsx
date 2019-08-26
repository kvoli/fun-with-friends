import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PersistGate } from 'redux-persist/integration/react';

import Main from './Main';
import NavBar from './NavBar';
import Footer from './Footer';

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Main />
      <Footer />
    </React.Fragment>
  );
}

export default App;
