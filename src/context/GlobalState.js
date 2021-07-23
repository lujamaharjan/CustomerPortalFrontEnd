import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import qs from "qs";
//Initial state
const initialState = {
  customer: null,
  error: null,
  phoneNoForOTP: null,
  password: "",
  confirmPassword: "",
  mobileNumber: "",
};

//create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setPhoneNumberForOTP(mobile) {
    dispatch({
      type: "SET_OTP_PHONE",
      payload: mobile,
    });
  }

  function setLoginPassword(password) {
    dispatch({
      type: "SET_PASSWORD",
      payload: password,
    });
  }

  function setLoginConfirmPassword(confirmPassword) {
    dispatch({
      type: "SET_CONFIRM_PASSWORD",
      payload: confirmPassword,
    });
  }

  function setCustomerId(customerId) {
    dispatch({
      type: "SET_CUSTOMER_ID",
      payload: customerId,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        customer: state.customer,
        phoneNoForOTP: state.phoneNoForOTP,
        password: state.password,
        confirmPassword: state.confirmPassword,
        customerId:state.customerId,
        setCustomerId,
        setPhoneNumberForOTP,
        setLoginPassword,
        setLoginConfirmPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
