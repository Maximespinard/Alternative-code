import React, { Fragment, useState, useLayoutEffect } from "react";
import "./Contact.css";
import Menu from "../Menu";
import Footer from "../Footer";

const Contact = () => {
  const [bg, setBg] = useState("");
  const getHour = new Date();
  useLayoutEffect(() => {
    if (getHour.getHours() <= 8 && getHour.getHours() >= 19) {
      setBg(
        "https://img.aws.la-croix.com/2020/01/20/1201072851/fenetre-Ciel_1_1399_933.jpg"
      );
    } else {
      setBg(
        " https://www.numerama.com/content/uploads/2019/11/etoiles-ciel-nuages-nuit-astronomie.jpg"
      );
    }
  });
  return (
    <Fragment>
      <Menu />
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="contact__wrapper"
      >
        <form className="col-md-5">
          <input name="name" type="text" placeholder="Votre nom" />
          <input name="email" type="text" placeholder="Votre email" />
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Votre message"
          ></textarea>
          <button>Envoyer</button>
        </form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
