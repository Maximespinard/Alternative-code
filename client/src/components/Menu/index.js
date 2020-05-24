import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./menu.css";
import logo from "../../assets/alternative.png";

const Menu = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="menu d-flex justify-content-between align-items-center p-3">
        <div>
          <img src={logo} alt="image-alternative"></img>
        </div>
        <div className="mr-4 d-none d-md-flex">
          <Link className="menu_link">Home</Link>
          <Link className="menu_link">About</Link>
          <Link className="menu_link">Démo</Link>
          <Link className="menu_link">Contact</Link>
        </div>
        <div className="d-none d-sm-block d-xs-block d-md-none">
          <i className="fas fa-bars" onClick={handleClick}></i>
        </div>
      </div>
      {show && (
        <div className="mobile_menu d-none d-sm-flex d-xs-flex d-md-none  flex-column">
          <Link className="menu_link--mobile mb-2">Home</Link>
          <Link className="menu_link--mobile mb-2">About</Link>
          <Link className="menu_link--mobile mb-2">Démo</Link>
          <Link className="menu_link--mobile mb-2">Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
