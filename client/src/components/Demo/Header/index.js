import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../../../assets/images/alternative.png";
import "./Header.css";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    setAvatar(props.user.avatar);
  });

  const handleLogout = () => {
    localStorage.clear();
    props.props.history.push("/");
  };
  return (
    <div>
      <Navbar className="headerUser fixed-top" fixed-top expand="lg">
        <Navbar.Brand>
          <Link to="/demo">
            <img src={logo} alt="alternative-code" />
          </Link>
        </Navbar.Brand>
        <div className="d-flex">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="d-lg-none">
              <Link className="headerMobile_Link" to="/">
                <p className="headerUser_link">{props.user.username}</p>
              </Link>
            </Nav.Link>
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
            <button onClick={handleLogout}>Deconnexion</button>
          </Nav>
          <div className="d-flex headerUser-infos mr-3 mb-1 ">
            {avatar !== "null" ? (
              <div
                className=" d-none d-lg-block"
                style={{
                  backgroundImage: `url(${props.user.avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ) : (
              <i className="fas fa-user-circle avatar d-none d-lg-block"></i>
            )}

            <p className="headerUser_p d-none d-lg-block">
              {props.user.username}
            </p>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
