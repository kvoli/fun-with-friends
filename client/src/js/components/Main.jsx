// Import Packages
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import Components
import MainPage from './MainPage';
import LogIn from './LogIn';
import SignUp from './SignUp';

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={MainPage}/>
        <Route exact path='/login' component={LogIn}/>
        <Route exact path='/signup' component={SignUp}/>
      </Switch>
    </main>
  );
}

export default Main;