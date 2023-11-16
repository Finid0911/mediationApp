import { formMessage } from "./message";
import { ToastAndroid } from "react-native";

export const validateEmail = (email) => {
  let defaultEmail = "abc@gmail.com";
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.trim() === "") {
    return {
      isValidated: false,
      message: formMessage.EMAIL_BLANK,
    };
  } else if (!validRegex.test(String(email).toLowerCase().trim())) {
    return {
      isValidated: false,
      message: formMessage.EMAIL_VALIDATE,
    };
    // } else if (email.trim() !== defaultEmail) {
    //   return {
    //     isValidated: false,
    //     message: formMessage.EMAILINVALID,
    //   };
  }
  return {
    isValidated: true,
  };
};

export const validatePassword = (password) => {
  let defaultPassword = "123456";
  if (password.trim() === "") {
    return {
      isValidated: false,
      message: formMessage.PASSWORD_BLANK,
    };
  } else if (password.length < 6) {
    return {
      isValidated: false,
      message: formMessage.PASSWORD_VALIDATE,
    };
    // } else if (password.trim() !== defaultPassword) {
    //   return { isValidated: false, message: formMessage.EMAILINVALID };
  }
  return { isValidated: true };
};
