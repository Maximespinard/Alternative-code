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
