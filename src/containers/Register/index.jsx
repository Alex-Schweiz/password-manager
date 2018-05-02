import React from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import * as routes from '../../constants/routes';
import { auth } from '../../firebase';
import FormLayout from '../../components/FormLayout';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Handle submit button
   * @param event
   */
  onSubmit(event) {
    const {
      email,
      passwordOne
    } = this.state;

    const {history} = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.LOGIN);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <FormLayout>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
          </FormGroup>
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
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </FormGroup>
          <FormGroup>
            <Input
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
          </FormGroup>
          <Button disabled={isInvalid} type="submit" color="primary" block>Register</Button>
          { error && <p>{error.message}</p> }
        </Form>
      </FormLayout>
    )
  }
}

