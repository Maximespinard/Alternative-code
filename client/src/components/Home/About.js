import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <div>
        <h2>Qui sommes nous ?</h2>
      </div>
      <div className="d-md-flex justify-content-row m-3">
        <div className="col-md-6 about_wrapper">
          <p>
            Alternative Code c'est l'idée de vous aider à concrétiser vos
            projets les plus fou! Aimant relever les défis les plus complexe,
            nos collaborateurs sont avant tout des PASSIONNÉS! Nous tranformons
            vos idées en lignes de code et nous trouvons des solutions à vos
            problèmes. Nous offrons à notre clientele un suivi personnalisé avec
            un interlocuteur unique et cela pour chacun de vos projets! Nous
            sommes à votre écoute et nou saurons vous conseiller n'attendez plus
            et discutons de votre projet...
          </p>
          <Link to="/login">
            <button>Démo</button>
          </Link>
        </div>
        <div className="col-md-6 d-none d-md-block image__about">
          <img
            src="https://i.pinimg.com/originals/e5/93/ab/e593ab0589d5f1b389e4dfbcce2bce20.gif"
            alt="creativity"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
