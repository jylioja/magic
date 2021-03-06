import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
};

export default routes;