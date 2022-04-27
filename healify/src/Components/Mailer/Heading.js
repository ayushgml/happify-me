import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Container } from "reactstrap";

export const Heading = () => {
  return (
    <div>
      <Navbar color="dark" dark>
        <Container>
          <NavbarBrand href="/">Contact List</NavbarBrand>
          <Nav>
            <NavItem>
              <Link className="btn btn-primary" to="/AddUser">
                Add User
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
