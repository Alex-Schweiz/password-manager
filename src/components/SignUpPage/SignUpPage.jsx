import React from 'react';

import Register from '../../containers/Register/Register';
import {withRouter} from "react-router-dom";

const SignUpPage = ({ history }) =>
  <div>
    <Register history={history} />
  </div>;

export default withRouter(SignUpPage);
