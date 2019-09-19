// Import Packages
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import Components
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';
import GroupPage from './GroupPage';
import GroupIndex from './GroupIndex';
import LandingPage from './LandingPage';
import toast from './NodeSnack';

// import action methods [api calls]
import { getArtifacts } from '../actions/artifact';
import { getAllCircles } from '../actions/circle';
import { getAllUsers } from '../actions/user';

function Main() {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  return (
    <main>
      <Switch>
        <Route exact path='/' component={auth.token ? MainPage : LandingPage} onEnterAction={auth.token ? dispatch(getArtifacts(auth.token)) : null} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route
          exact
          path='/circle/:id'
          component={auth.token ? GroupPage : LandingPage}
          onEnterAction={auth.token ? dispatch(getAllUsers(auth.token)) : toast.error('You do not have permissions to view this page')}
        />
        <Route
          exact
          path='/circles'
          component={auth.token ? GroupIndex : LandingPage}
          onEnterAction={auth.token ? dispatch(getAllCircles(auth.token), getAllUsers(auth.token)) : null}
        />
      </Switch>
    </main>
  );
}

export default Main;
