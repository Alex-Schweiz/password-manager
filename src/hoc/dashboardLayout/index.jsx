import React from 'react';
import { Row, Col, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import SignOutButton from '../../components/SignOutButton';

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <Row className="bg-dark">
          <Navbar>
            <NavbarBrand className="text-white">Password Manager</NavbarBrand>
            <Nav>
              <NavItem>
                <SignOutButton />
              </NavItem>
            </Nav>
          </Navbar>
        </Row>
        <Row>
          <Col sm="2" className="bg-dark">
            <NavItem className="text-white">
              Dashboard
            </NavItem>
          </Col>
          <Col sm="10">
            <main className="m-4">
              {this.props.children}
            </main>
          </Col>
        </Row>
      </div>
    )
  }
}
