import React from "react";
import Typewriter from "typewriter-effect";

const Header = () => {
  return (
    <div className="header ">
      <div className="header__filter d-md-flex">
        <div className="header__left">
          <div className="header__title">
            <Typewriter
              options={{
                strings: [
                  "Site web",
                  "Appli mobile",
                  "E-commerce",
                  "Web app",
                  "Desktop app",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="icon__wrapper">
            <div className="icon">
              <i className=" fab fa-facebook-f"></i>
            </div>
            <div className="icon">
              <i className=" fab fa-whatsapp"></i>
            </div>
            <div className="icon">
              <i className="fab fa-youtube"></i>
            </div>
          </div>
        </div>
        <div className="d-md-none"></div>
        <div className="header__right d-md-block">
          <div>
            <div>
              <i className="fab fa-react"></i>
              <i className="d-none d-md-block fab fa-node-js"></i>
              <i className="d-none d-md-block fab fa-js-square"></i>
              <i className="d-none d-md-block fab fa-python"></i>
              <i className="d-none d-md-block fab fa-app-store-ios"></i>
              <i className="d-none d-md-block fab fa-google-play"></i>
              <i className="d-none d-md-block fab fa-google"></i>
              <i className="d-none d-md-block fab fa-safari"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
