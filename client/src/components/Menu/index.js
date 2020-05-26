import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-scroll";

import logo from "../../assets/images/alternative.png";
import "./menu.css";

const Menu = () => {
  return (
    <Navbar className="menu" expand="lg">
      <Navbar.Brand href="#home">
        <img src={logo} alt="alternative-code" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">
            <p>Home</p>
          </Nav.Link>
          <Nav.Link href="#link">
            <Link to="about" smooth={true} duration={2000}>
              <p>About</p>
            </Link>
          </Nav.Link>
          <Nav.Link href="#link">
            <p>Démo</p>
          </Nav.Link>
          <Nav.Link href="#link">
            <p>Contact</p>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
