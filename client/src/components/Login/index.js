import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
  let userData = {
    email: "",
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
    const { email, password } = input;
    axios
      .post("http://localhost:8000/api/auth", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        props.history.push(`/demo?id=${res.data.id}`);
      })
      .catch((err) => {
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  const errorMessage =
    error !== "" ? <p className="errorMessage">{error}</p> : null;

  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="login-wrapper d-flex flex-column justify-content-center col-lg-5 col-xl-4 col-md-6 col-sm-8">
        <Link className="icon" to="/">
          <i className="fas fa-times "></i>
        </Link>
        <h2>Connexion</h2>
        {errorMessage}
        <div>
          <form onSubmit={handleSubmit} className="d-flex flex-column col-8">
            <input
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
              className="login_input"
              type="text"
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
              <p>Pas de compte ? S'inscrire !</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
