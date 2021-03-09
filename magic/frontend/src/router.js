import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />,
};

export default routes;