import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link as Scroll } from "react-scroll";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alternative.png";
import "./menu.css";

const Menu = (props) => {
  return (
    <Navbar className="menu" expand="lg">
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="alternative-code" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link>
            <Scroll to="home" smooth={true} duration={2000}>
              <Link to="/">
                <p>Home</p>
              </Link>
            </Scroll>
          </Nav.Link>
          <Nav.Link>
            <Scroll to="about" smooth={true} duration={2000}>
              <Link to="/">
                <p>About</p>
              </Link>
            </Scroll>
          </Nav.Link>
          <Nav.Link>
            <Link to="/login">
              <p>Demo</p>
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
