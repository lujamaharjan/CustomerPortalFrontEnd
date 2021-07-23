import React, { useState, useContext } from "react";
import axios from "axios";

import { GlobalContext } from "../context/GlobalState";
import { Redirect } from "react-router-dom";

function Otp(props) {
  const { phoneNoForOTP } = useContext(GlobalContext);
  const [otpNumber, setOtpNumber] = useState("");

  if (phoneNoForOTP === null) {
    return <Redirect to="/register" />;
  }

  async function validateUser(e) {
    e.preventDefault();

    try{
        const result = await axios({
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            url: `https://localhost:44363/api/Values/verifyOtp?otpNumber=${otpNumber}`,
          });
    }
    catch(e){
        console.log("something went wrong");
        return;
    }
    props.history.push("/reset-password");
  }

  return (
    <div className="col-md-6 mx-auto p-5 shadow my-4">
      <h5 className="bold">
        Please enter 6 digit OTP sent via SMS on your phone
      </h5>
      <h5 className="bold">
        (+977 {phoneNoForOTP.slice(0, 2)}******{phoneNoForOTP.slice(8)})
      </h5>
      <form onSubmit={(e) => validateUser(e)}>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            value={otpNumber}
            onChange={(e) => setOtpNumber(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger float-end">
          Verify
        </button>
        <p className="text-primary">Step 3</p>
      </form>
    </div>
  );
}

export default Otp;
