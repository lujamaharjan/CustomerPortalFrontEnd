export default (state, action) => {
  switch (action.type) {
    case "GET_CUSTOMER":
      return {
        ...state,
        customer: action.payload,
      };

    case "SET_OTP_PHONE":
      return {
        ...state,
        phoneNoForOTP: action.payload,
      };

    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.payload,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };

    case "CUSTOMER_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_CUSTOMER_ID":
      return {
        ...state,
        customerId: action.payload,
      };
    default:
      return state;
  }
};
