import React, { useLayoutEffect , useState } from "react";
import axios from "axios";
import queryString from "query-string";
import "./Demo.css";

const Demo = (props) => {
  const [user, setUser] = useState([]);

  const parse = queryString.parse(props.location.search);
  const id = parse.id;
  const JWTtoken = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${JWTtoken}` }
};


useLayoutEffect (() => {
    const getCurrentUser = async () => {
      await axios.get(`http://localhost:8000/api/user/${id}`, config)
      .then((res) => {
          setUser(res.data.response)
      })
      .catch((err) => {
          props.history.push('/')
          console.log(err)
      })
    };
    getCurrentUser()
  }, []);


  return <div className="demo">Demo</div>;
};

export default Demo;
