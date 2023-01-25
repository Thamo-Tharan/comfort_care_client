export const onValidUsername = (val) => {
  const usernameRegex = /^[A-Za-z]+[0-9_.A-Za-z]*$/;
  return usernameRegex.test(val);
};
export const onValidemail = (val) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
};
export const passwordvalidation = (val) => {
  const passwordregex = val.length >= 8;
  return passwordregex;
};
