import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import classnames from "classnames";
import logo from "../img/logo.png";

function Login(props) {
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile number must be 10 digit!");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password should be atleast 8 charaters!");
      return;
    }

    const data = {
      username: mobile,
      password: password,
      grant_type: "password",
    };

    let res;
    try {
      res = await axios({
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "https://localhost:44363/token",
        data: qs.stringify(data),
      });
      const data2 = {
        username: "DishhomeDevs",
        password: "DmnDevs@!@#",
        cusId: mobile,
      };

      const result = await axios({
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://fnapi.dishhome.com.np/fiberservice.asmx/FetchCustomerInfoJson",
        data: qs.stringify(data2),
      });
      localStorage.setItem("customerId", JSON.stringify(result.data.CustomerInfoResult.CustomerId));
    } catch (e) {
      setPasswordError("Phone number and password not matched");
      return;
    }
    localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
    setPasswordError("");
    setMobileError("");
    props.history.push("/customer");
  };
  return (
    <div className="container fw-bold">
      <div className="col-md-6 mx-auto my-5 p-5 shadow-sm shadow">
        <h2 className="mb-4 fw-bold text-center">
          <img src={logo} alt="logo" className="logo-image mr-2" /> Customer
          Portal
        </h2>

        <hr />

        <h3 className="my-4">Login</h3>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": mobileError,
              })}
              id="mobile"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setMobileError("");
              }}
            />
            {mobileError && (
              <div className="invalid-feedback">{mobileError}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": passwordError,
              })}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && (
              <div className="invalid-feedback">{passwordError}</div>
            )}
          </div>
          <button type="submit" className="btn btn-danger fw-bold">
            Login
          </button>
        </form>
        <p className="fw-normal mt-3">
          <Link to="/forget-password">forgot password?</Link>
        </p>
        <p className="fw-normal mt-1">
          Not registerd yet! click <Link to="/register">here</Link> to register.
        </p>
      </div>
    </div>
  );
}

export default Login;
