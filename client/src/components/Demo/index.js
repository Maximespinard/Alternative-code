import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";

import "./Demo.css";
import Footer from "../Footer";
import Header from "./Header";

const Demo = (props) => {
  const [user, setUser] = useState([]);

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

  return (
    <div>
      <Header props={props} user={user} />
      <div className="demo container-fluid">
        <h2>Des fonctionnalitées rien que pour vous</h2>
        <div className="row demo_row1 d-flex justify-content-between  ml-3 mr-3">
          <div className="col-lg-3 demo_col d-flex align-items-center justify-content-center">
            <button>Une premiere</button>
          </div>
          <div className="col-lg-3 demo_col d-flex align-items-center justify-content-center">
            <button>Ici une deuxième</button>
          </div>
          <div className="col-lg-3 demo_col d-flex align-items-center justify-content-center">
            <button>Et la une troisième</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Demo;
