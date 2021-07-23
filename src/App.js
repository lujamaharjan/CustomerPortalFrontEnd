import { useState } from "react";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "font-awesome/css/font-awesome.css";
import "./index.css";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Customer from "./pages/Customer";
import ResetPassword from "./pages/ResetPassword";
import ForgetOtp from "./pages/ForgetOtp";
import RouteGuard from "./components/RouteGuard";

import PhoneNumber from "./components/PhoneNumber";


import { GlobalProvider } from "./context/GlobalState";


function App() {
  
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/otp-validation" component={Otp} />
          <Route exact path="/forget-password" component={PhoneNumber}/>
          <Route exact path="/reset-otp" component={ForgetOtp}/>
          <Route exact path="/reset-password" component={ResetPassword}/>
          <RouteGuard path="/customer" component={Customer} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}


export default App;
