import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
  let userData = {
    email: "",
    firstname: "",
    password: "",
  };

  const [input, setInput] = useState(userData);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.firstname === "") {
      const { email, password, firstname } = input;
      axios
        .post("https://alternative-code.herokuapp.com/api/auth", {
          email,
          firstname,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          props.history.push(`/demo?id=${res.data.id}`);
        })
        .catch(() => {
          setError("L'email adresse ou le mot de passe est invalide");
          setTimeout(() => {
            setError("");
          }, 4000);
        });
    } else {
      props.history.push("/");
    }
  };

  const errorMessage =
    error !== "" ? <p className="errorMessage">{error}</p> : null;

  return (
    <div className="login ">
      <div className="login-wrapper ">
        <i
          onClick={() => props.history.push("/")}
          className="icon__login fas fa-times "
        ></i>
        <h2>Connexion</h2>
        {errorMessage}
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="login_input"
              type="text"
            />
            <input
              className="d-none"
              onChange={handleChange}
              type="firstname"
              name="firstname"
              placeholder="Votre email"
            />
            <input
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="login_input"
              type="password"
            />
            <button className="login_button">Go !</button>
            <Link to="/signup" className="login_p">
              <p>Pas de compte ?</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
