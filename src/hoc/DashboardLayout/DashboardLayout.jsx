import React, { Component } from 'react';

import { Container, Row, Col } from 'reactstrap';

import SignOutButton from '../../components/SignOutButton/SignOutButton'

class Layout extends Component {
  state = {};

  render () {
    return (
      <div>
        <Row>
          <Col sm="2">.col-sm-2</Col>
          <Col sm="10">
            <Container>
              <Row className="bg-secondary p-2">
                <SignOutButton />
              </Row>
              <main>
                {this.props.children}
              </main>
            </Container>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Layout;