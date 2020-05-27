import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../../../assets/images/alternative.png";
import "./Header.css";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const handleLogout = () => {
      localStorage.clear()
      props.props.history.push('/')
  }
  return (
    <div>
      <Navbar className="headerUser row" expand="lg">
        <Navbar.Brand href="#home">
          <Link to="/demo">
            <img src={logo} alt="alternative-code" />
          </Link>
        </Navbar.Brand>
        <div className="d-flex">
          <div onClick={handleClick} className="d-flex headerUser-infos">
            <i className="fas fa-user-circle avatar d-lg-none "></i>
            <p className="headerUser_p d-lg-none ">{props.user.username}</p>
            <i className=" headerUser_arrow fas fa-sort-down d-lg-none "></i>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <Link to="/">
                <p className="headerUser_link">Home</p>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/contact">
                <p className="headerUser_link">Contact</p>
              </Link>
            </Nav.Link>
          </Nav>
          <div onClick={handleClick} className="d-flex headerUser-infos">
            <i className="fas fa-user-circle avatar d-none d-lg-block"></i>
            <p className="headerUser_p d-none d-lg-block">
              {props.user.username}
            </p>
            <i className=" headerUser_arrow fas fa-sort-down d-none d-lg-block"></i>
          </div>
        </Navbar.Collapse>
      </Navbar>
      {show ? (
        <div className="d-flex justify-content-end headerUser_info--selected--wrapper">
          <div className="headerUser_info--selected">
            <p>Profile</p>
            <button onClick={handleLogout}>Deconnexion</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
