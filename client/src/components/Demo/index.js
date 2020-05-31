import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

import "./Demo.css";
import Footer from "../Footer";
import Header from "./Header";
import Profile from "./Profile";
import Weather from "./Weather";

const Demo = (props) => {
  const [user, setUser] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showWeather, setshowWeather] = useState(false);

  const parse = queryString.parse(props.location.search);
  const id = parse.id;
  const JWTtoken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${JWTtoken}` },
  };

  useLayoutEffect(() => {
    const getCurrentUser = async () => {
      await axios
        .get(`http://localhost:8000/api/user/${id}`, config)
        .then((res) => {
          setUser(res.data.response);
        })
        .catch((err) => {
          props.history.push("/");
          console.log(err);
        });
    };
    getCurrentUser();
  }, []);

  const handleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleWeather = () => {
    setshowWeather(!showWeather);
  };

  return (
    <div className="demo-wrapper">
      <Header props={props} user={user} />
      <div className="demo">
        <h2>Des fonctionnalitées rien que pour vous</h2>
        <div className="row demo_row1 d-flex justify-content-between  ml-3 mr-3">
          <div className="col-lg-3 demo_col d-flex">
            {showProfile ? (
              <Profile
                props={props}
                user={user}
                handleProfile={handleProfile}
              />
            ) : (
              <button onClick={handleProfile}>
                Modifier votre profil par exemple
              </button>
            )}
          </div>
          <div className="col-lg-3 demo_col d-flex">
            {showWeather ? (
              <Weather handleWeather={handleWeather} />
            ) : (
              <button onClick={handleWeather}>Voir la météo</button>
            )}
          </div>
          <div className="col-lg-3 demo_col d-flex">
            <button>Et la une troisième</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Demo;
