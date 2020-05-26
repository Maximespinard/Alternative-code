import React from "react";
import Typewriter from "typewriter-effect";

const Header = () => {
  return (
    <div className="header d-md-flex">
      <div className="header__left">
        <Typewriter
          options={{
            strings: [
              "<h1 class='white '>Hello</h1>",
              "<h1 class='white'>world</h1>",
              "<h1 class='white'>world</h1>",
            ],
            autoStart: true,
            loop: true,
          }}
        />
        <div className="icon__wrapper">
          <i className="icon fab fa-facebook-f"></i>
          <i className="icon fab fa-whatsapp"></i>
          <i className="icon fab fa-snapchat-ghost"></i>
        </div>
      </div>
      <div className="header__right d-none d-md-block">right</div>
    </div>
  );
};

export default Header;
