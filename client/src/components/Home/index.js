import React from "react";
import Header from "./Header";
import About from "./About";
import "./Home.css";
import Comments from "./Comments";

const Home = (props) => {
  return (
    <div className="home">
      <Header props={props} />
      <About />
      <Comments />
    </div>
  );
};

export default Home;
