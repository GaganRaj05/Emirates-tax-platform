import React from "react";
import ReactDOM from "react-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { ToastContainer } from "react-toastify";
// layouts


// views without layouts

import AppRouter from "router";

ReactDOM.render(
    <>
      <AppRouter/>
      <ToastContainer position="top-center"/>
    </>
  ,
  document.getElementById("root")
);
