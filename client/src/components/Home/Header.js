import React from "react";
import Typewriter from "typewriter-effect";

const Header = () => {
  return (
    <div className="header d-md-flex">
      <div className="header__left">
        <Typewriter
          options={{
            cursor: "",
            strings: ["<h1>Hello World</h1>", "<h1>Ca va ou quoi ?</h1>"],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="header__right d-none d-md-block">right</div>
    </div>
  );
};

export default Header;
