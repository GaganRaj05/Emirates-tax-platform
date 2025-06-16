import React from "react";
import ReactDOM from "react-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "context/AuthContext";


import AppRouter from "router";

ReactDOM.render(
    <>
    <AuthProvider>
      <AppRouter/>
      <ToastContainer position="top-center"/>
    </AuthProvider>


    </>
  ,
  document.getElementById("root")
);
