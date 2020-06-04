import React from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFound__wrapper">
      <Menu />
      <div>
        <h1>404</h1>
        <p>Oups! Il n'y a rien ici ...</p>
        <small>Pas de panique on vous reconduit vers la page d'accueil.</small>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
