import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import * as routes from './constants/routes';
import { firebase } from './firebase';

import Dashboard from './containers/Dashboard';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';

class App extends Component {
  state = {authUser: null};

  componentWillMount() {
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
          {this.state.authUser ?
            <div>
              <Route
                exact path={routes.REGISTER}
                component={() => <Dashboard />}
              />
              <Redirect to="/" />
            </div>
            :
            <Redirect to="/login" />
          }
        </div>
      </Router>
    );
  }
}

export default App;
