import React from 'react';

import Login from '../../containers/Login/Login'
import {withRouter} from "react-router-dom";

const SignUpPage = ({ history }) =>
  <div>
    <Login history={history} />
  </div>;

export default withRouter(SignUpPage);
