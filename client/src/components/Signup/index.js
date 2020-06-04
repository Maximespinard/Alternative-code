import React, { useState, useMemo } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = (props) => {
  let userData = {
    email: "",
    firstname: "",
    username: "",
    password: "",
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
    if (input.firstname === "") {
      const { email, username, firstname, password } = input;
      if (passwordValid) {
        axios
          .post("https://alternative-code.herokuapp.com/api/user/add", {
            email,
            firstname,
            username,
            password,
          })
          .then((res) => {
            setError("");
            setSuccess(res.data.response);
            setTimeout(() => {
              setSuccess("");
              props.history.push("/login");
            }, 3000);
          })
          .catch(() => {
            setError("L'email adresse ou l'identifiant est déjà utilisé ");
            setTimeout(() => {
              setError("");
            }, 4000);
          });
      } else {
        setPasswordValid(false);
        setError("Eh Oh check ton mot de passe!");
      }
    } else {
      props.history.push("/");
    }
  };

  const successMessage =
    success !== "" ? <p className="sucessMessage">{success}</p> : null;
  const errorMessage =
    error !== "" ? <p className="errorMessage">{error}</p> : null;

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <i
          onClick={() => props.history.push("/login")}
          className="icon__login fas fa-arrow-left "
        ></i>
        <h2>Inscription</h2>
        <div>
          {successMessage}
          {errorMessage}
        </div>
        <div>
          <form onSubmit={handleSubmit}>
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
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Nom d'utilisateur"
              className="signup_input"
            />
            <input
              className="d-none"
              onChange={handleChange}
              type="firstname"
              name="firstname"
              placeholder="Votre email"
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
              <div className="white mt-3">
                Votre mot de passe doit contenir au moins 6 caractères , [A -Z]
                , [a - z] , [0- 9]
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
