import React, { useState, useContext } from "react";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
function PhoneNumber(props) {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const { setPhoneNumberForOTP } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile number must be 10 digit!");
      return;
    }
    //check mobile is registered or not
    const response = await axios({
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      url: `https://localhost:44363/api/values/isregistered?phoneNumber=${mobile}`,
    });
    if (response.data === 200) {
      setMobileError("User is not already registered yet");
      return;
    }

    const res = await axios({
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      url: `https://localhost:44363/api/values/sendOtp?phoneNumber=${mobile}`,
    });
    if (res.data.ResponseCode === 400) {
      setMobileError("Something went wrong, please try again!");
      return;
    }
    setPhoneNumberForOTP(mobile);
    props.history.push("/reset-otp");
  };

  return (
    <div className="col-sm-4 mx-auto mt-5 card">
      <div className="p-4">
        <h4 className="fw-bold text-center mb-3">Forgot Password</h4>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fa fa-phone text-danger"></i>
            </span>
            <input
              type="text"
              className={classnames("form-control", {
                "is-invalid": mobileError,
              })}
              placeholder="Mobile Number"
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

          <button className="btn btn-danger float-end">Submit</button>
        </form>
        <small>OTP will be send to your phone number</small>
      </div>
      <div className="card-footer">
        <p className="text-center pt-2 text-decoration-none">
          <Link to="/">Back</Link>
        </p>
      </div>
    </div>
  );
}

export default PhoneNumber;
