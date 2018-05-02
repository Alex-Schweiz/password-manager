import React from 'react';
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, Button } from 'reactstrap';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import FormLayout from '../../components/FormLayout';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class Login extends React.Component {
  state = { ...INITIAL_STATE };

  /**
   * Handle submit button
   * @param event
   */
  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {history} = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.DASHBOARD);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <FormLayout>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </FormGroup>
          <FormGroup>
            <Input
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <Button disabled={isInvalid} color="primary" block>Log in</Button>
          { error && <p>{error.message}</p> }
        </Form>
        <p>No account? Click here to</p>
        <Link to="/register">Register</Link>
      </FormLayout>
    )
  }
}
