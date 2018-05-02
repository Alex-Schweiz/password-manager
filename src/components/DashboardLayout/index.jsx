import React from 'react';
import { Row, Col, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';

import SignOutButton from '../SignOutButton/index';

export default function Layout(props) {
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
        <Col sm="12">
          <main className="m-4">
            {props.children}
          </main>
        </Col>
      </Row>
    </div>
  )
}
