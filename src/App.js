import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as routes from './constants/routes';
import { firebase } from './firebase';

import Dashboard from './containers/Dashboard/Dashboard';
import SignUpPage from './containers/Register/Register';
import SignInPage from './containers/Login/Login';

class App extends Component {
  state = {
    authUser: null
  };

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Route
            exact path={routes.DASHBOARD}
            component={() => <Dashboard />}
          />
          <Route
            exact path={routes.LOGIN}
            component={() => <SignInPage />}
          />
          <Route
            exact path={routes.REGISTER}
            component={() => <SignUpPage />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
