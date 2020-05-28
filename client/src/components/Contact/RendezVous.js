import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";

const RendezVous = (props) => {
  const date = new Date();
  const data = {
    name: "",
    number: "",
    datetime: "",
  };
  const [form, setForm] = useState(data);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/contact/rdv", {
        name: form.name,
        number: form.number,
        datetime: form.datetime,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="rdv__wrapper">
      <p onClick={() => props.setRdv(false)}>
        Retourner au formulaire de contact
      </p>
      <form onSubmit={handleSubmit} className="col-md-5">
        <h3>Prenez un rendez-vous téléphonique avec un conseillé</h3>
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          type="text"
          placeholder="Votre nom"
        />
        <input
          onChange={handleChange}
          value={form.number}
          name="number"
          type="number"
          placeholder="Votre numéro de téléphone"
        />
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime}
          min={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}T${
            date.getHours
          }:${date.getMinutes()}`}
        ></input>
        <small>
          En soumettant ce formulaire j'accepte que mes données soient utilisé
          uniquement pour me répondre
        </small>
        <button>Envoyer</button>
      </form>
    </div>
  );
};

export default RendezVous;
