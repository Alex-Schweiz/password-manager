import React from 'react';

import { Link, withRouter, Redirect } from 'react-router-dom';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
  <div>
    <Login history={history} />
  </div>;

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends React.Component {
  state = { ...INITIAL_STATE };

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

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
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Container>
        <div className="card card-container">
          <img className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
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
        </div>
      </Container>
    )
  }
}

export default withRouter(SignInPage);

export {
  Login,
};