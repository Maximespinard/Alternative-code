import React from "react";
import Header from "./Header";
import About from "./About";
import "./Home.css";
import Comments from "./Comments";

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <Comments />
    </div>
  );
};

export default Home;
