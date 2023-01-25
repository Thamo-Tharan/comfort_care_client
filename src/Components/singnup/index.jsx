/* eslint-disable no-unused-expressions */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/signup/index.css";
import { useState } from "react";
import {
  onValidUsername,
  passwordvalidation,
} from "../../Validations/signInSignup";
export const Signupcom = (props) => {
  const { showpop, setshowpop } = props;
  const handleClose = () => setshowpop(!showpop);
  const [mode, setmode] = useState("signin");
  const [buttondisabled, setbutondisabled] = useState(true);
  const [signinerror, setsigninerror] = useState({
    username: "",
    password: "",
  });
  const validatefun = (e) => {
    //for taking the input parent elements interation
    const parentelement =
      e.currentTarget.parentElement.parentElement.getElementsByTagName("input");
    // to find the current actions input
    const currentfoucs = e.currentTarget.id;
    //to find nextelement value
    const nextvaluecheck =
      currentfoucs === "username"
        ? parentelement[1].value
        : parentelement[0].value;
    if (e.currentTarget.value !== "") {
      for (let index = 0; index < parentelement.length; index++) {
        switch (true) {
          case parentelement[index].id === "username" &&
            currentfoucs === "username":
            const userresult = onValidUsername(parentelement[index].value);
            return userresult
              ? (setsigninerror({ ...signinerror, username: "" }),
                signinerror.password === "" && nextvaluecheck !== ""
                  ? setbutondisabled(false)
                  : setbutondisabled(true))
              : (setsigninerror({
                  ...signinerror,
                  username: "Please enter valid username",
                }),
                setbutondisabled(true));
          case parentelement[index].id === "password" &&
            currentfoucs === "password":
            const passwordresult = passwordvalidation(
              parentelement[index].value
            );
            return passwordresult
              ? (setsigninerror({ ...signinerror, password: "" }),
                signinerror.username === "" && nextvaluecheck !== ""
                  ? setbutondisabled(false)
                  : setbutondisabled(true))
              : (setsigninerror({
                  ...signinerror,
                  password: "Password atleast 8 character",
                }),
                setbutondisabled(true));
          default:
        }
      }
    } else {
      setsigninerror({ username: "", password: "" });
      setbutondisabled(true);
    }
  };
  return (
    <>
      <Modal show={showpop}>
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
                    onChange={validatefun}
                  />
                  {signinerror.username !== "" ? (
                    <p className="error-class">{signinerror.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Password"
                    onChange={validatefun}
                  />
                  {signinerror.password !== "" ? (
                    <p className="error-class">{signinerror.password}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="span-class-register">
                <input id="username" type="text" placeholder="Username" />
                <input id="email" type="text" placeholder="Emailaddress" />
                <input
                  id="mobilenumber"
                  type="text"
                  placeholder="Mobile number"
                />
                <input id="password" type="text" placeholder="Password" />
                <input
                  id="repassword"
                  type="text"
                  placeholder="Confirm password"
                />
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
                    setmode("signup");
                    setsigninerror({ username: "", password: "" });
                  }}
                >
                  click here
                </span>
              </div>
              <Button variant="primary" disabled={buttondisabled}>
                Signin
              </Button>
            </>
          ) : (
            <>
              <div id="registerspan">
                <p>Already have account</p>
                <span onClick={() => setmode("signin")}>click here</span>
              </div>
              <Button variant="primary" disabled={true}>
                Signup
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
