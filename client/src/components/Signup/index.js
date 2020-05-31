import React, { useState, useMemo } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = (props) => {
  let userData = {
    email: "",
    pseudo: "",
    password: "",
    passwordConfirmation: "",
  };

  const [passwordValid, setPasswordValid] = useState(false);
  const [input, setInput] = useState(userData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useMemo(() => {
    let maj = /[A-Z]/g;
    let min = /[a-z]/g;
    let num = /[0-9]/g;
    if (
      input.password.match(maj) &&
      input.password.match(min) &&
      input.password.match(num) &&
      input.password.length >= 6
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [input.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, pseudo, password, passwordConfirmation } = input;
    if (passwordValid) {
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
    } else {
      setPasswordValid(false);
    }
  };

  const successMessage =
    success !== "" ? <p className="sucessMessage">{success}</p> : null;
  const errorMessage =
    error !== "" ? <p className="errorMessage">{error}</p> : null;

  return (
    <div className="signup d-flex justify-content-center align-items-center">
      <div className="signup-wrapper d-flex col-md-5">
        <i
          onClick={() => props.history.push("/login")}
          className="icon__login fas fa-arrow-left "
        ></i>
        <h2>Inscription</h2>
        {successMessage}
        {errorMessage}
        <div>
          <form onSubmit={handleSubmit} className="d-flex flex-column col-8">
            <input
              required
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="signup_input"
            />
            <input
              required
              name="pseudo"
              value={input.pseudo}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              className="signup_input"
            />

            <input
              required
              className="signup_input"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              type="password"
            />
            {passwordValid && (
              <button className="signup_button">S'inscrire</button>
            )}
            {!passwordValid && (
              <small className="white">
                Votre mot de passe doit contenir au moins 6 caractères , [A -Z]
                , [a - z] , [0- 9]
              </small>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
