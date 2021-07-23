import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import qs from "qs";
import logo from "../img/logo.png";

import { GlobalContext } from "../context/GlobalState";

function Register(props) {
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [mobileOrCusId, setMobileOrCusId] = useState("");
  const [mobileOrCusIdErrors, setmobileOrCusIdErrors] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const[FormError, setFormError] = useState("");

  const {
    phoneNoForOTP,
    setPhoneNumberForOTP,
    setLoginPassword,
    setLoginConfirmPassword,
    setCustomerId,
  } = useContext(GlobalContext);

  const checkUserIsRegistered = async (e) => {
    e.preventDefault();
    //Check For Errors

    if (mobileOrCusId.length === 7 || mobileOrCusId.length === 10) {
      try {
        const data = {
          username: "DishhomeDevs",
          password: "DmnDevs@!@#",
          cusId: mobileOrCusId,
        };

        const res = await axios({
          method: "post",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          url: "http://fnapi.dishhome.com.np/fiberservice.asmx/FetchCustomerInfoJson",
          data: qs.stringify(data),
        });

        //if response code is ok then user is verified
        if (res.data.ResponseCode === 200) {
          const customerId = res.data.CustomerInfoResult.CustomerId.toString();
          const data2 = {
            username: "DishhomeDevs",
            password: "DmnDevs@!@#",
            cusId: customerId,
          };
          // call a api to get phone no of the user to send otp
          // If user use customer Id for registration we don't have
          // the mobile number. so, we fetch it
          const result = await axios({
            method: "post",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: "http://fnapi.dishhome.com.np/fiberservice.asmx/FetchCustomerInfoDetailJson",
            data: qs.stringify(data2),
          });
        
          const phoneNum =
            result.data.CustomerInfoResult.data.customer.mobile_no1;
          setPhoneNumberForOTP(phoneNum);

          //check weather user is already registerd or not
          const response = await axios({
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            url: `https://localhost:44363/api/values/isregistered?phoneNumber=${phoneNum}`,
          });
          if (response.data === 404) {
            setmobileOrCusIdErrors("User is already registered");
            return;
          }
          setIsUserVerified(true);
        } else {
          throw "Not Found";
        }
      } catch (err) {
        console.log(err);
        setmobileOrCusIdErrors("Invalid phone number or customer id!");
        return;
      }
    } else {
      setmobileOrCusIdErrors("Invalid phone number or customer id!");
      return;
    }

    
    //clear State
    setmobileOrCusIdErrors(null);
    setMobileOrCusId("");
  };

  const validateRegister = async (e) => {
    e.preventDefault();
    //check for error
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
        "content-type": "application/json",
      },
      url: `https://localhost:44363/api/values/sendotp?phoneNumber=${phoneNoForOTP}`,
    });
    if(response.data.ResponseCode === 400){
      setFormError("Something went wrong, please try again!")
    }

    const result = await axios({
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      url: "https://localhost:44363/api/account/register",
      data: {
        PhoneNumber: phoneNoForOTP,
        password,
        confirmPassword,
      },
    });
    setLoginPassword(password);
    setLoginConfirmPassword(confirmPassword);
    props.history.push("/otp-validation");
  };

  const phoneNumberForm = (
    <form className="clearfix" onSubmit={(e) => checkUserIsRegistered(e)}>
      <div className="mb-3">
        <label htmlFor="mobile-cusId" className="form-label">
          Mobile Number/Customer Id
        </label>
        <input
          type="text"
          className={classnames("form-control", {
            "is-invalid": mobileOrCusIdErrors,
          })}
          id="mobile-cusId"
          value={mobileOrCusId}
          onChange={(e) => {setMobileOrCusId(e.target.value); setmobileOrCusIdErrors("");}}
        />
        {mobileOrCusIdErrors && (
          <div className="invalid-feedback">{mobileOrCusIdErrors}</div>
        )}
      </div>
      <button type="submit" className="btn btn-danger fw-bold float-end">
        Next
      </button>
      <span className="text-center text-primary">Step 1</span>
    </form>
  );

  const passwordForm = (
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
          onChange={(e) => setPassword(e.target.value)}
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
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <div className="invalid-feedback">{confirmPasswordError}</div>
        )}
      </div>

      <button type="submit" className="btn btn-danger fw-bold float-end">
        Next
      </button>
      <span className="text-center text-primary">Step 2</span>
    </form>
  );

  return (
    <div className="container fw-bold">
      <div className="col-md-6 mx-auto my-5 p-5 shadow">
        <h2 className="mb-4 fw-bold text-center">
          <img src={logo} alt="logo" className="logo-image mr-2" /> Customer
          Portal
        </h2>

        <hr />
        <h3 className="my-4">Register</h3>
        {confirmPasswordError && (
          <div className="invalid-feedback">{FormError}</div>
        )}
        {!isUserVerified ? phoneNumberForm : passwordForm}

        <p className="fw-normal mt-3">
          Already Registered login <Link to="/">here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
