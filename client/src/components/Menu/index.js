import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/images/alternative.png";

import "./Menu.css";

const Header = () => {
  const [burger, setBurger] = useState(false);

  const handleClick = () => {
    setBurger(!burger);
  };
  return (
    <div>
      <header className="menu">
        <div className=" d-flex justify-content-between ">
          <div className=" image_menu-wrapper d-none d-md-block m-4">
            <img src={logo} alt="alternative-code"/>
          </div>
          <div className="justify-content-end d-none d-md-flex menu_links">
            <Link to="" className="menu_link">
              <p>Home</p>
            </Link>
            <Link to="" className="menu_link">
              <p>About</p>
            </Link>
            <Link to="" className="menu_link">
              <p>Démo</p>
            </Link>
            <Link to="" className="menu_link">
              <p>Contact</p>
            </Link>
          </div>
        </div>
        <div className="d-md-none d-flex justify-content-between i_wrapper">
          <Link className="menu_i--link mt-2" to="/">
            <img src={logo} alt="alternative-code"/>
          </Link>
          <i className="fas fa-bars" onClick={handleClick}></i>
        </div>
      <div className="d-none d-sm-block d-md-none menu_burger">
        {burger && (
          <div className="menu_burger--content">
            <div>Home</div>
            <div>About</div>
            <div>Démo</div>
            <div>Contact</div>
          </div>
        )}
      </div>
      </header>
    </div>
  );
};

export default Header;
