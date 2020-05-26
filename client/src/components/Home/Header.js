import React, { useState, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";

const Header = () => {
  const test = useRef();

  const infos = {
    x: "",
    y: "",
  };
  const [position, setPosition] = useState(infos);
  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      setPosition({
        x: e.pageX,
        y: e.pageY,
      })
    );
    test.current.style.top = position.y;
    test.current.style.left = position.x;
    console.log(test.current.style.top);
  }, [setPosition, test]);
  if (test?.current?.style?.top !== "") {
    console.log(test?.current?.style?.top);
  }
  return (
    <div className="header d-md-flex">
      <p className="white">
        X = {position.x} - Y = {position.y}
      </p>
      <div ref={test} className="cercle"></div>
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
      <div className="header__right d-none d-md-block">
        <div>
          <div>
            <i className="fab fa-react"></i>
            <i className="fab fa-js-square"></i>
            <i className="fab fa-python"></i>
            <i className="fab fa-app-store-ios"></i>
            <i className="fab fa-google-play"></i>
            <i className="fab fa-node-js"></i>
            <i className="fas fa-mobile-alt"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-safari"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
