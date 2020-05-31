import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [input, setInput] = useState(user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(props.user);
    setInput(props.user);
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    const { _id, username, email } = input;
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/update", {
        id: _id,
        username,
        email,
      })
      .then((res) => {
        setSuccess(res.data.response);
        setTimeout(() => {
          setSuccess("");
          window.location.reload(false);
        }, 3000);
        alert("ok");
      })
      .catch((err) => {
        setError(err);
        alert("non ok");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { _id } = input;
    axios
      .post("http://localhost:8000/api/user/delete", {
        id: _id,
      })
      .then((res) => {
        setSuccess(res.data.response);
        setTimeout(() => {
          props.history.push("/");
          setSuccess("");
        }, 4000);
      })
      .catch((err) => {
        setError(err);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div className="profile">
      <div className="profile_form--wrapper">
        <form className="profile_form">
          <input
            type="text"
            onChange={handleChange}
            value={input.username}
            name="username"
            placeholder="Identifiant"
          />
          <input
            type="text"
            onChange={handleChange}
            value={input.email}
            name="email"
            placeholder="Email"
          />
          <button onClick={handleUpdate}>Modifer</button>
          <button onClick={handleDelete}>Supprimer le profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
