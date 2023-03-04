import React, { useState } from "react";

import Register from "./auth/Register";
import Login from "./auth/Login";
import loginImg from "../assets/Desktop - 2.png";
import "./home.css";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const handleRoutes = () => {
    setIsSignUp(true);
  };
  return <> hello</>;
};

export default Home;
