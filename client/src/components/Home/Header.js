import React from "react";
import Typewriter from "typewriter-effect";

const Header = () => {
  return (
    <div className="header d-md-flex">
      <div className="header__left">
        <div className="header__title">
          <Typewriter
            options={{
              strings: [
                "Alternative Code",
                "Appli mobile",
                "Web app",
                "Site web",
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
      <div className="header__right">
        <div>
          <div>
            <i className="fab fa-react"></i>
            <i className="fab fa-js-square"></i>
            <i className="fab fa-python"></i>
            <i className="fab fa-app-store-ios"></i>
            <i className="fab fa-google-play"></i>
            <i className="fab fa-node-js"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-safari"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
