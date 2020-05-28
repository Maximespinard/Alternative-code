import React, { Fragment, useState, useLayoutEffect } from "react";
import "./Contact.css";
import Menu from "../Menu";
import Footer from "../Footer";

const Contact = () => {
  return (
    <Fragment>
      <Menu />
      <div className="contact__wrapper">
        <div className="contact__infos d-md-flex">
          <div className="col-md-3">
            Mail <i className="far fa-envelope"></i>
          </div>
          <div className="col-md-3">
            Téléphone <i className="fas fa-phone"></i>
          </div>
          <div className="col-md-3">
            Prendre rendez-vous <i className="far fa-calendar-alt"></i>
          </div>
        </div>
        <form className="col-md-5">
          <h3>Parlez-nous de votre projet</h3>
          <input name="name" type="text" placeholder="Votre nom" />
          <input name="email" type="text" placeholder="Votre email" />
          <textarea
            name="message"
            cols="30"
            rows="10"
            placeholder="Votre message"
          ></textarea>
          <small>
            En soumettant ce formulaire j'accepte que mes données soient utilisé
            uniquement pour me répondre
          </small>
          <button>Envoyer</button>
        </form>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
