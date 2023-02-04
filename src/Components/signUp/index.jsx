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
  const [mode, setMode] = useState("signin");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [signInError, setSignInError] = useState({
    username: "",
    password: "",
  });
  const [signUpError, setSignUpError] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    repeatPassword: "",
  });
  const dispatch = useDispatch();
  //common fun to get inputValues
  const inputValues = (id) => document.getElementById(id).value;
  //signup to check all the values
  const signUpValueChecking = (elements) => {
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
              ? (setSignInError({ ...signInError, username: "" }),
                signInError.password === "" && nextValueCheck !== ""
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignInError({
                  ...signInError,
                  username: "Please enter valid username",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "password" &&
            currentFocus === "password":
            const passwordResult = passwordValidation(
              parentElement[index].value
            );
            return passwordResult
              ? (setSignInError({ ...signInError, password: "" }),
                signInError.username === "" && nextValueCheck !== ""
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignInError({
                  ...signInError,
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
    const otherValues = signUpValueChecking(parentElement);
    if (e.currentTarget.value !== "") {
      for (let index = 0; index < parentElement.length; index++) {
        switch (true) {
          case parentElement[index].id === "username" &&
            currentFocus === "username":
            const userResult = onValidUsername(parentElement[index].value);
            return userResult
              ? (setSignUpError({ ...signUpError, username: "" }),
                signUpError.password === "" &&
                signUpError.repeatPassword === "" &&
                signUpError.mobile === "" &&
                signUpError.email === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...signUpError,
                  username: "Please enter valid username",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "email" && currentFocus === "email":
            const emailResult = onValidEmail(parentElement[index].value);
            return emailResult
              ? (setSignUpError({ ...signUpError, email: "" }),
                signUpError.password === "" &&
                signUpError.repeatPassword === "" &&
                signUpError.mobile === "" &&
                signUpError.username === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...signUpError,
                  email: "Please enter valid email",
                }),
                setButtonDisabled(true));
          case parentElement[index].id === "mobileNumber" &&
            currentFocus === "mobileNumber":
            const mobileResult = mobileNumberValidation(
              parentElement[index].value
            );
            return mobileResult
              ? (setSignUpError({ ...signUpError, mobile: "" }),
                signUpError.password === "" &&
                signUpError.repeatPassword === "" &&
                signUpError.email === "" &&
                signUpError.username === "" &&
                otherValues
                  ? setButtonDisabled(false)
                  : setButtonDisabled(true))
              : (setSignUpError({
                  ...signUpError,
                  mobile: "Please enter valid mobileNumber",
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
                ? (setSignUpError({ ...signUpError, password: "" }),
                  signUpError.mobile === "" &&
                  signUpError.repeatPassword === "" &&
                  signUpError.email === "" &&
                  signUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...signUpError,
                    password: "Password atleast 8 character",
                  }),
                  setButtonDisabled(true));
            } else {
              const sameValueCheck = e.currentTarget.value === nextValueCheck;
              return sameValueCheck
                ? (setSignUpError({ ...signUpError, password: "" }),
                  signUpError.mobile === "" &&
                  signUpError.repeatPassword === "" &&
                  signUpError.email === "" &&
                  signUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...signUpError,
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
                ? (setSignUpError({ ...signUpError, repeatPassword: "" }),
                  signUpError.mobile === "" &&
                  signUpError.password === "" &&
                  signUpError.email === "" &&
                  signUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...signUpError,
                    repeatPassword: "Password atleast 8 character",
                  }),
                  setButtonDisabled(true));
            } else {
              const sameValueCheck = e.currentTarget.value === passwordCheck;
              return sameValueCheck
                ? (setSignUpError({ ...signUpError, repeatPassword: "" }),
                  signUpError.mobile === "" &&
                  signUpError.password === "" &&
                  signUpError.email === "" &&
                  signUpError.username === "" &&
                  otherValues
                    ? setButtonDisabled(false)
                    : setButtonDisabled(true))
                : (setSignUpError({
                    ...signUpError,
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
  const signInFunction = () => {
    localStorage.setItem("userinfo", inputValues("username"));
    dispatch({type:'login',username:inputValues("username")});
    setShowPopup(!showPopup);
  };
  return (
    <>
      <Modal show={showPopup}>
        <Modal.Header>
          <Modal.Title>
            {mode === "signin" ? "Signin Form" : "Signup Form"}
          </Modal.Title>
          <span className="material-symbols-outlined" onClick={handleClose}>
            close
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="register">
            {mode === "signin" ? (
              <div className="span-class-signin">
                <div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={validateFunction}
                  />
                  {signInError.username !== "" ? (
                    <p className="error-class">{signInError.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Password"
                    onChange={validateFunction}
                  />
                  {signInError.password !== "" ? (
                    <p className="error-class">{signInError.password}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="span-class-register">
                <div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={registerFunction}
                  />
                  {signUpError.username !== "" ? (
                    <p className="error-class">{signUpError.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Email address"
                    onChange={registerFunction}
                  />
                  {signUpError.email !== "" ? (
                    <p className="error-class">{signUpError.email}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="mobileNumber"
                    type="text"
                    placeholder="mobileNumber"
                    onChange={registerFunction}
                  />
                  {signUpError.mobile !== "" ? (
                    <p className="error-class">{signUpError.mobile}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Password"
                    onChange={registerFunction}
                  />
                  {signUpError.password !== "" ? (
                    <p className="error-class">{signUpError.password}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="repeatPassword"
                    type="text"
                    placeholder="Confirm password"
                    onChange={registerFunction}
                  />
                  {signUpError.repeatPassword !== "" ? (
                    <p className="error-class">{signUpError.repeatPassword}</p>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {mode === "signin" ? (
            <>
              <div id="signinspan">
                <p>Don't have account</p>
                <span
                  onClick={() => {
                    setMode("signup");
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
                onClick={signInFunction}
              >
                SignIn
              </Button>
            </>
          ) : (
            <>
              <div id="registerspan">
                <p>Already have account</p>
                <span
                  onClick={() => {
                    setMode("signin");
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
