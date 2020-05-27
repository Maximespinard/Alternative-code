import React, { Fragment } from "react";
import "./Contact.css";
import Menu from "../Menu";
import Footer from "../Footer";

const Contact = () => {
  return (
    <Fragment>
      <Menu />
      <div className="contact__wrapper">
        <h1>Contact</h1>
        <form className="col-md-5">
          <input type="text" />
          <input type="text" />
          <button>Envoyer</button>
        </form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
