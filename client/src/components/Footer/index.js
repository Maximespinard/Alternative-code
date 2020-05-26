import React from "react";
import "./Footer.css";

const index = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer>
      Copyright 2019 - {year} | All right reserved | Alternative Code
    </footer>
  );
};

export default index;
