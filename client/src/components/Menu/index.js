import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import logo from "../../assets/images/alternative.png";
import "./menu.css";

const Menu = () => {
  return (
    <div className="menu">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <div className="menu_img-wrapper d-flex ">
              <img src={logo} alt="alternative code" />
            </div>
            <Nav className="mr-auto">
              <div className="d-flex flex-row">
                <Nav.Link href="#home"><p>Home</p></Nav.Link>
                <Nav.Link href="#link"><p>About</p></Nav.Link>
                <Nav.Link href="#link"><p>Démo</p></Nav.Link>
                <Nav.Link href="#link"><p>Contact</p></Nav.Link>
              </div>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
