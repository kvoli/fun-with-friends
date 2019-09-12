// Import Packages
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Import Components
import MainPage from './MainPage';
import Login from './Login';
import SignUp from './SignUp';
import { getArtifacts } from '../actions/artifact';
import GroupPage from './GroupPage';
import GroupIndex from './GroupIndex';

function Main() {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth);
  return (
    <main>
      <Switch>
        <Route exact path='/' component={MainPage} onEnterAction={(auth.token) ? dispatch(getArtifacts()) : null}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/circle/:id' component={GroupPage}/>
        <Route exact path='/circles' component={GroupIndex} />
      </Switch>
    </main>
  );
}

export default Main;