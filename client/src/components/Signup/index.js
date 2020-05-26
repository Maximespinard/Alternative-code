import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = (props) => {
  let userData = {
    email: "",
    pseudo: "",
    password: "",
    passwordConfirmation: "",
  };

  const [input, setInput] = useState(userData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, pseudo, password, passwordConfirmation } = input;
    if (password === passwordConfirmation) {
      axios
        .post("http://localhost:8000/api/user/add", {
          email,
          username: pseudo,
          password,
        })
        .then((res) => {
          setSuccess(res.data.response);
          setTimeout(() => {
            setSuccess("");
            props.history.push("/login");
          }, 4000);
        });
    } else {
      setError("Mot de passe non identique");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const successMessage = success !== "" ? <p className="sucessMessage">{success}</p> : null;
  const errorMessage = error !== "" ? <p className="errorMessage">{error}</p> : null;

  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="signup-wrapper d-flex flex-column justify-content-center col-lg-5 col-xl-4 col-md-6 col-sm-8">
        <div className="d-flex">
          <Link className="icon" to="/login">
            <i className="fas fa-arrow-circle-left "></i>
          </Link>
          <h2>Inscription</h2>
        </div>
          {successMessage}
          {errorMessage}
        <div>
          <form onSubmit={handleSubmit} className="d-flex flex-column col-8">
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="signup_input"
            />
            <input
              name="pseudo"
              value={input.pseudo}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              className="signup_input"
            />
            <input
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="signup_input"
              type="password"
            />
            <input
              name="passwordConfirmation"
              value={input.passwordConfirmation}
              onChange={handleChange}
              placeholder="Confirmation du mot de passe"
              className="signup_input"
              type="password"
            />
            <button className="signup_button">S'inscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
