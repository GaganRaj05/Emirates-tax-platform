import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import Admin_Consultant_Login from "views/auth/Admin&ConsultantLogin";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/admin" component={Admin} />
        <Route path="/auth" component={Auth} />
        <Route path="/landing" component={Landing} />
        <Route path="/profile" component={Profile} />
        <Route path="/admin-login" component={Admin_Consultant_Login} />
      </Switch>
    </Router>
  );
}
