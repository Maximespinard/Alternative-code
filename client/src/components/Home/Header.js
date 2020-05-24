import React from "react";
import "./Home.css";

//images
import reactLogo from "../../assets/images/react.png";

const Header = () => {
  return (
    <header className="header d-md-flex">
      <div className="header__left">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
        perferendis, quidem aliquam aspernatur dignissimos facilis cupiditate
        fugiat placeat soluta labore commodi ex temporibus porro magnam enim
        doloremque aut ad ipsam?
      </div>
      <div className="header__right d-md-flex d-none">
        <div className="right__left">
          <img className="header__img" src={reactLogo} alt="reactjs" />
          <img className="header__img" src={reactLogo} alt="reactjs" />
          <img className="header__img" src={reactLogo} alt="reactjs" />
        </div>
        <div className="right__right">
          <img className="header__img" src={reactLogo} alt="reactjs" />
          <img className="header__img" src={reactLogo} alt="reactjs" />
          <img className="header__img" src={reactLogo} alt="reactjs" />
        </div>
      </div>
    </header>
  );
};

export default Header;
