import React from 'react';
import {Container} from 'reactstrap';

export default class FormLayout extends React.Component {
  render () {
    return (
      <Container>
        <div className="card card-container">
          <img className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="user-avatar"/>
          {this.props.children}
        </div>
      </Container>
    )
  }
}
