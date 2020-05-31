import React, { useState, useLayoutEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

const Comments = () => {
  const data = {
    username: "",
    firstname: "",
    email: "",
    message: "",
    stars: 0,
  };

  const [form, setForm] = useState(data);
  const [reviews, setReviews] = useState([]);
  const [wantDelete, setWantDelete] = useState(false);
  const [author, setAuthor] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (form.firstname === "") {
      axios
        .post("http://localhost:8000/api/comment/add", {
          email: form.email,
          username: form.username,
          message: form.message,
          stars: form.stars,
          firstname: form.firstname,
        })
        .then((res) => {
          setForm("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Toi t'es un robot");
    }
  };

  //récupération des commentaires en bdd
  useLayoutEffect(() => {
    axios
      .get("http://localhost:8000/api/comment")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const icon = (num) => {
    return (
      <i
        name="stars"
        onClick={() => setForm({ ...form, stars: num })}
        className={`${form.stars >= num ? "starSelected" : "star"} fas fa-star`}
      ></i>
    );
  };

  const handleDeleteChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleDelete = (e, authorEmail, commentId) => {
    if (author === authorEmail) {
      axios
        .delete(`http://localhost:8000/api/comment/${commentId}`)
        .then((res) => {
          console.log("COOOOOOLLLL");
        })
        .catch((err) => {
          console.log("ERREUUUR");
        });
    } else {
      console.log("Erreur email");
    }
  };

  return (
    <div className="comments__wrapper">
      <h2>Vos avis</h2>
      <div>
        <Carousel>
          {reviews.map((review) => {
            return (
              <Carousel.Item key={review.message}>
                <div className="comment col-md-6">
                  <div>
                    {review.stars} <i className="fas fa-star"></i>
                    {wantDelete && (
                      <form
                        className="form__delete"
                        onSubmit={(e) =>
                          handleDelete(e, review.email, review._id)
                        }
                      >
                        <p>Vous voulez supprimer ce commentaire ?</p>{" "}
                        <input
                          onChange={handleDeleteChange}
                          value={author}
                          type="email"
                          placeholder="Saisissez votre email"
                        />
                      </form>
                    )}
                  </div>
                  <p>{review.message}</p>
                  <b>
                    {review.username} <small>le {review.createdAt}</small>
                    <i
                      id="trash"
                      className="fas fa-trash-alt"
                      onClick={() => setWantDelete(!wantDelete)}
                    ></i>
                  </b>
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

      <form onSubmit={handleSubmit} className="comment__form col-md-6">
        <h2>Laissez-nous un commentaire</h2>
        <input
          required
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Votre nom"
        />
        <input
          required
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Votre email"
        />
        <input
          className="d-none"
          onChange={handleChange}
          type="firstname"
          name="firstname"
          placeholder="Votre email"
        />
        <br />
        <textarea
          required
          onChange={handleChange}
          name="message"
          cols="30"
          rows="5"
          maxLength="150"
          placeholder="Votre message"
        ></textarea>
        <div>
          {icon(1)}
          {icon(2)}
          {icon(3)}
          {icon(4)}
          {icon(5)}
        </div>
        <button>Envoyer</button>
      </form>
    </div>
  );
};

export default Comments;
