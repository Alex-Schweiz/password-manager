import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as routes from './constants/routes';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            exact path={routes.DASHBOARD}
            component={() => <Dashboard />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
