import React, { Fragment, useState } from "react";
import axios from "axios";
import "./Contact.css";
import Menu from "../Menu";
import Footer from "../Footer";
import RendezVous from "./RendezVous";

const Contact = () => {
  const data = {
    name: "",
    email: "",
    message: "",
  };
  const [form, setForm] = useState(data);
  const [rdv, setRdv] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/contact", {
        name: form.name,
        email: form.email,
        message: form.message,
      })
      .then((res) => {
        console.log(res);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 4000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Menu />
      <div className="contact__wrapper">
        <div className="contact__infos ">
          <div>
            <a href="mailto:contact@alternative-code.com">
              contact@alternative-code.com
            </a>
            <i className="far fa-envelope"></i>
          </div>
          <div>
            06 49 79 96 76 <i className="fas fa-phone"></i>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setRdv(!rdv)}
          >
            Prendre un rendez-vous <i className="far fa-calendar-alt"></i>
          </div>
        </div>
        {!rdv ? (
          <form onSubmit={handleSubmit} className="col-md-5">
            <h3>Parlez-nous de votre projet</h3>
            {message && <p className="success">Message envoyé</p>}
            <input
              onChange={handleChange}
              value={form.name}
              name="name"
              type="text"
              placeholder="Votre nom"
            />
            <input
              onChange={handleChange}
              value={form.email}
              name="email"
              type="email"
              placeholder="Votre email"
            />
            <textarea
              onChange={handleChange}
              value={form.message}
              name="message"
              cols="30"
              rows="10"
              placeholder="Votre message"
            ></textarea>
            <small>
              En soumettant ce formulaire j'accepte que mes données soient
              utilisé uniquement pour me répondre
            </small>
            <button>Envoyer</button>
          </form>
        ) : (
          <RendezVous setRdv={setRdv} />
        )}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
