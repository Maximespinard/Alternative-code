import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alternative.png";
import "./menu.css";

const Menu = () => {
  return (
    <Navbar className="menu" expand="lg">
      <Navbar.Brand>
        <img src={logo} alt="alternative-code" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <Link to="/">
              <p>Home</p>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Scroll to="about" smooth={true} duration={2000}>
              <p>About</p>
            </Scroll>
          </Nav.Link>
          <Nav.Link>
            <Link to="/login">
              <p>Démo</p>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/contact">
              <p>Contact</p>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
