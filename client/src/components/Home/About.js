import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/social-media.jpg";

const About = () => {
  return (
    <div className="about">
      <div>
        <h2>Qui sommes nous ?</h2>
      </div>
      <div className="row m-3">
        <div className="col-lg-5 about_wrapper">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <Link to="/login"><button>Voir ce qu'on peux faire</button></Link>
        </div>
        <div className="col-lg-6 d-none d-md-block ml-4 mt-5">
          <img src={img} alt="creativity" />
        </div>
      </div>
    </div>
  );
};

export default About;
