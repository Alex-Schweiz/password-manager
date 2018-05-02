import React from 'react';
import { NavLink } from 'reactstrap';

import { auth } from '../../firebase';

export default function SignOutButton () {
  return (
    <NavLink
      href="#"
      onClick={auth.doSignOut}
      className="text-white"
    >Log out</NavLink>
  )
};
