import React from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import logo from "../img/logo.png";

function NavBar(props) {
  const logout = e =>{
    localStorage.removeItem("access_token");
    props.history.push("/")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-0">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="log" className="img-fluid w-25" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fw-bold text-danger" to="/customer">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fw-bold text-danger" onClick={(e) => logout(e)}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default withRouter(NavBar);
