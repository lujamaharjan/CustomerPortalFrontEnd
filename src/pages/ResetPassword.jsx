import React, { useState, useContext } from "react";
import classnames from "classnames";
import qs from 'qs';
import {Redirect} from 'react-router-dom';
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

function ResetPassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { phoneNoForOTP } = useContext(GlobalContext);

  if (phoneNoForOTP === null) {
    return <Redirect to="/" />;
  }

  const validateRegister = async(e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError("Password must be atleast 8 character!");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Confirm Password must match with password!");
      return;
    }
    //sending otp
    const response = await axios({
        method: "post",
        headers: {
            "content-type": "application/x-www-form-urlencoded" ,
        },
        url: `https://localhost:44363/api/values/ForgotPassword`,
        data:qs.stringify({
            Password:password,
            confirmPassword: confirmPassword,
            PhoneNumber: phoneNoForOTP,
        }),
      });
      if(response.data.ResponseCode === 400){
        setConfirmPasswordError("Something went wrong, please try again!")
      }
      props.history.push("/");
  };
  return (
    <div className="col-md-4 mx-auto shadow p-4 mt-5">
      <p className="text-center fw-bold">Reset Password</p>
      <form className="clearfix" onSubmit={(e) => validateRegister(e)}>
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
        <div className="mb-4">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={classnames("form-control", {
              "is-invalid": confirmPasswordError,
            })}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError("");
            }}
          />
          {confirmPasswordError && (
            <div className="invalid-feedback">{confirmPasswordError}</div>
          )}
        </div>

        <button type="submit" className="btn btn-danger fw-bold float-end">
          Save
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
