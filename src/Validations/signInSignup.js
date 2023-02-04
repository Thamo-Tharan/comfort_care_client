export const onValidUsername = (val) => {
  const usernameRegex = /^[A-Za-z]+[0-9_.A-Za-z]*$/;
  return usernameRegex.test(val);
};
export const onValidEmail = (val) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
};
export const passwordValidation = (val) => {
  const passwordRegex = val.length >= 8;
  return passwordRegex;
};
export const mobileNumberValidation = (val) => {
  const passwordRegex = val.length === 10;
  return passwordRegex;
};
