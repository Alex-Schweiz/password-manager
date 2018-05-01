import React from 'react';
import { Button } from 'reactstrap';

import { auth } from '../../firebase';

const SignOutButton = () =>
  <Button
    color="primary"
    onClick={auth.doSignOut}
  >Log out
  </Button>;

export default SignOutButton;