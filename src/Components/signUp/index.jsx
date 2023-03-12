/* eslint-disable no-unused-expressions */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/signup/index.css";
import { useState } from "react";
import {
  mobileNumberValidation,
  onValidUsername,
  onValidEmail,
  passwordValidation,
} from "../../Validations/signInSignup";
import { useDispatch } from "react-redux";
export const SignUp = (props) => {
  const { showPopup, setShowPopup } = props;
  const handleClose = () => setShowPopup(!showPopup);
  const [mode, setMode] = useState("SignIn");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [SignInError, setSignInError] = useState({
    username: "",
    password: "",
  });
  const [SignUpError, setSignUpError] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    repeatPassword: "",
  });
  const dispatch = useDispatch();
  //common fun to get inputValues
  const inputValues = (id) => document.getElementById(id).value;
  //SignUp to check all the values
  const SignUpValueChecking = (elements) => {
    let count = 0;
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].value !== "") {
        count = count + 1;
      } else {
        break;
      }
    }
    return count === 5;
  };
  //common fun to set empty value for inputs
  const emptyInputFunction = () => {
    const parentNode = document.querySelector(".register div").childNodes;
    for (let index = 0; index < parentNode.length; index++) {
      parentNode[index].querySelector("input").value = "";
    }
  };
  const validateFunction = (e) => {
    //for taking the input parent elements iteration
    const parentElement =
      e.currentTarget.parentElement.parentElement.getElementsByTagName("input");
    // to find the current actions input
    const currentFocus = e.currentTarget.id;
    //to find nextElement value
    const nextValueCheck =
      currentFocus === "username"
        ? parentElement[1].value
        : parentElement[0].value;
    if (e.currentTarget.value !== "") {
      for (let index = 0; index < parentElement.length; index++) {
        switch (true) {
          case parentElement[index].id === "username" &&
            currentFocus === "username":
            const userResult = onValidUsername(parentElement[index].value);
            return userResult
              ? (setSignInError({ ...SignInError, username: "" }),
                SignInError.password === "" && nextValueCheck !== ""
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignInError({
                  ...SignInError,
                  username: "Please enter valid username",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "password" &&
            currentFocus === "password":
            const passwordResult = passwordValidation(
              parentElement[index].value
            );
            return passwordResult
              ? (setSignInError({ ...SignInError, password: "" }),
                SignInError.username === "" && nextValueCheck !== ""
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignInError({
                  ...SignInError,
                  password: "Password at least 8 character",
                }),
                setButtonDisabled(true));
          default:
        }
      }
    } else {
      setSignInError({ username: "", password: "" });
      setButtonDisabled(true);
    }
  };
  //validation for registration
  const registerFunction = (e) => {
    const parentElement =
      e.currentTarget.parentElement.parentElement.getElementsByTagName("input");
    console.log(parentElement);
    // to find the current actions input
    const currentFocus = e.currentTarget.id;
    //to check other values are empty or not
    const otherValues = SignUpValueChecking(parentElement);
    if (e.currentTarget.value !== "") {
      for (let index = 0; index < parentElement.length; index++) {
        switch (true) {
          case parentElement[index].id === "username" &&
            currentFocus === "username":
            const userResult = onValidUsername(parentElement[index].value);
            return userResult
              ? (setSignUpError({ ...SignUpError, username: "" }),
                SignUpError.password === "" &&
                SignUpError.repeatPassword === "" &&
                SignUpError.mobile === "" &&
                SignUpError.email === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...SignUpError,
                  username: "Please enter valid username",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "email" && currentFocus === "email":
            const emailResult = onValidEmail(parentElement[index].value);
            return emailResult
              ? (setSignUpError({ ...SignUpError, email: "" }),
                SignUpError.password === "" &&
                SignUpError.repeatPassword === "" &&
                SignUpError.mobile === "" &&
                SignUpError.username === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...SignUpError,
                  email: "Please enter valid email address",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "mobileNumber" &&
            currentFocus === "mobileNumber":
            const mobileResult = mobileNumberValidation(
              parentElement[index].value
            );
            return mobileResult
              ? (setSignUpError({ ...SignUpError, mobile: "" }),
                SignUpError.password === "" &&
                SignUpError.repeatPassword === "" &&
                SignUpError.email === "" &&
                SignUpError.username === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...SignUpError,
                  mobile: "Please enter valid mobile number",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "password" &&
            currentFocus === "password":
            const nextValueCheck = inputValues("repeatPassword");
            if (nextValueCheck === "") {
              const passwordResult = passwordValidation(
                parentElement[index].value
              );
              return passwordResult
                ? (setSignUpError({ ...SignUpError, password: "" }),
                  SignUpError.mobile === "" &&
                  SignUpError.repeatPassword === "" &&
                  SignUpError.email === "" &&
                  SignUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...SignUpError,
                    password: "Password must be atleast 8 character",
                  }),
                  setButtonDisabled(true));
            } else {
              const sameValueCheck = e.currentTarget.value === nextValueCheck;
              return sameValueCheck
                ? (setSignUpError({ ...SignUpError, password: "" }),
                  SignUpError.mobile === "" &&
                  SignUpError.repeatPassword === "" &&
                  SignUpError.email === "" &&
                  SignUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...SignUpError,
                    password: "Password not matching",
                  }),
                  setButtonDisabled(true));
            }
          case parentElement[index].id === "repeatPassword" &&
            currentFocus === "repeatPassword":
            const passwordCheck = inputValues("password");
            if (passwordCheck === "") {
              const passwordResult = passwordValidation(
                parentElement[index].value
              );
              return passwordResult
                ? (setSignUpError({ ...SignUpError, repeatPassword: "" }),
                  SignUpError.mobile === "" &&
                  SignUpError.password === "" &&
                  SignUpError.email === "" &&
                  SignUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...SignUpError,
                    repeatPassword: "Password must be atleast 8 character",
                  }),
                  setButtonDisabled(true));
            } else {
              const sameValueCheck = e.currentTarget.value === passwordCheck;
              return sameValueCheck
                ? (setSignUpError({ ...SignUpError, repeatPassword: "" }),
                  SignUpError.mobile === "" &&
                  SignUpError.password === "" &&
                  SignUpError.email === "" &&
                  SignUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...SignUpError,
                    repeatPassword: "Password not matching",
                  }),
                  setButtonDisabled(true));
            }
          default:
        }
      }
    } else {
      setSignUpError({
        username: "",
        email: "",
        mobile: "",
        password: "",
        repeatPassword: "",
      });
      setButtonDisabled(true);
    }
  };
  const SignInFunction = () => {
    localStorage.setItem("userinfo", inputValues("username"));
    dispatch({type:'login',username:inputValues("username")});
    setShowPopup(!showPopup);
  };
  return (
    <>
      <Modal show={showPopup}>
        <Modal.Header>
          <Modal.Title>
            {mode === "SignIn" ? "SignIn Form" : "SignUp Form"}
          </Modal.Title>
          <span className="material-symbols-outlined" onClick={handleClose}>
            close
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="register">
            {mode === "SignIn" ? (
              <div className="span-class-sign_in">
                <div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    onChange={validateFunction}
                  />
                  {SignInError.username !== "" ? (
                    <p className="error-class">{SignInError.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    onChange={validateFunction}
                  />
                  {SignInError.password !== "" ? (
                    <p className="error-class">{SignInError.password}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="span-class-register">
                <div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    onChange={registerFunction}
                  />
                  {SignUpError.username !== "" ? (
                    <p className="error-class">{SignUpError.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter email address"
                    onChange={registerFunction}
                  />
                  {SignUpError.email !== "" ? (
                    <p className="error-class">{SignUpError.email}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="mobileNumber"
                    type="text"
                    placeholder="Enter mobile number"
                    onChange={registerFunction}
                  />
                  {SignUpError.mobile !== "" ? (
                    <p className="error-class">{SignUpError.mobile}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Enter password"
                    onChange={registerFunction}
                  />
                  {SignUpError.password !== "" ? (
                    <p className="error-class">{SignUpError.password}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="repeatPassword"
                    type="text"
                    placeholder="Confirm  password"
                    onChange={registerFunction}
                  />
                  {SignUpError.repeatPassword !== "" ? (
                    <p className="error-class">{SignUpError.repeatPassword}</p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {mode === "SignIn" ? (
            <>
              <div id="sign_in_span">
                <p>Don't have an account</p>
                <span
                  onClick={() => {
                    setMode("SignUp");
                    setSignInError({ username: "", password: "" });
                    setButtonDisabled(true);
                    emptyInputFunction();
                  }}
                >
                  click here
                </span>
              </div>
              <Button
                variant="primary"
                disabled={buttonDisabled}
                onClick={SignInFunction}
              >
                SignIn
              </Button>
            </>
          ) : (
            <>
              <div id="register_span">
                <p>Already have  an account?</p>
                <span
                  onClick={() => {
                    setMode("SignIn");
                    setButtonDisabled(true);
                    setSignUpError({
                      username: "",
                      email: "",
                      mobile: "",
                      password: "",
                      repeatPassword: "",
                    });
                    emptyInputFunction();
                  }}
                >
                  click here
                </span>
              </div>
              <Button variant="primary" disabled={buttonDisabled}>
                SignUp
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
