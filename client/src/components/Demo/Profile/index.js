import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [input, setInput] = useState(user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

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
      .put("http://localhost:8000/api/user/update", {
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
          props.props.history.push("/");
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

  const handleShowDelete = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <div className="profile">
      <div className="profile_form--wrapper">
        <p onClick={props.handleProfile} className="profile_exit">
          <i className="fas fa-times "></i>
        </p>
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
          <button onClick={handleShowDelete}>Supprimer le profil</button>
        </form>
      </div>
      {show ? (
        <div className="profile_delete">
          <h3>Êtes vous sûr de vouloir supprimer votre profil ?</h3>
          <button onClick={handleDelete} className="profile_delete_yes">
            Oui
          </button>
          <button onClick={handleShowDelete} className="profile_delete_no">
            Annuler
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
