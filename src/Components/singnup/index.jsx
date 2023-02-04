/* eslint-disable no-unused-expressions */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/signup/index.css";
import { useState } from "react";
import {
  mobilenumbervalidation,
  onValidUsername,
  onValidemail,
  passwordvalidation,
} from "../../Validations/signInSignup";
import {useDispatch} from 'react-redux'
export const Signupcom = (props) => {
  const { showpop, setshowpop } = props;
  const handleClose = () => setshowpop(!showpop);
  const [mode, setmode] = useState("signin");
  const [buttondisabled, setbutondisabled] = useState(true);
  const [signinerror, setsigninerror] = useState({
    username: "",
    password: "",
  });
  const [signuperror, setsignuperror] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    repeatpaswd: "",
  });
  const dispatch=useDispatch();
  //common fun to get inputvalues
  const inputvalues = (id) => document.getElementById(id).value;
  //signup to check all the values
  const signupvaluechecking = (elements) => {
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
  const emptyinputfun = () => {
    const parentnodes = document.querySelector(".register div").childNodes;
    for (let index = 0; index < parentnodes.length; index++) {
      parentnodes[index].querySelector("input").value = "";
    }
  };
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
  //validation for registeration
  const registerfun = (e) => {
    const parentelement =
      e.currentTarget.parentElement.parentElement.getElementsByTagName("input");
    console.log(parentelement);
    // to find the current actions input
    const currentfoucs = e.currentTarget.id;
    //to check other values are empty or not
    const othervalues = signupvaluechecking(parentelement);
    if (e.currentTarget.value !== "") {
      for (let index = 0; index < parentelement.length; index++) {
        switch (true) {
          case parentelement[index].id === "username" &&
            currentfoucs === "username":
            const userresult = onValidUsername(parentelement[index].value);
            return userresult
              ? (setsignuperror({ ...signuperror, username: "" }),
                signuperror.password === "" &&
                signuperror.repeatpaswd === "" &&
                signuperror.mobile === "" &&
                signuperror.email === "" &&
                othervalues
                  ? setbutondisabled(false)
                  : setbutondisabled(true))
              : (setsignuperror({
                  ...signuperror,
                  username: "Please enter valid username",
                }),
                setbutondisabled(true));
          case parentelement[index].id === "email" && currentfoucs === "email":
            const emailresult = onValidemail(parentelement[index].value);
            return emailresult
              ? (setsignuperror({ ...signuperror, email: "" }),
                signuperror.password === "" &&
                signuperror.repeatpaswd === "" &&
                signuperror.mobile === "" &&
                signuperror.username === "" &&
                othervalues
                  ? setbutondisabled(false)
                  : setbutondisabled(true))
              : (setsignuperror({
                  ...signuperror,
                  email: "Please enter valid email",
                }),
                setbutondisabled(true));
          case parentelement[index].id === "mobilenumber" &&
            currentfoucs === "mobilenumber":
            const mobresult = mobilenumbervalidation(
              parentelement[index].value
            );
            return mobresult
              ? (setsignuperror({ ...signuperror, mobile: "" }),
                signuperror.password === "" &&
                signuperror.repeatpaswd === "" &&
                signuperror.email === "" &&
                signuperror.username === "" &&
                othervalues
                  ? setbutondisabled(false)
                  : setbutondisabled(true))
              : (setsignuperror({
                  ...signuperror,
                  mobile: "Please enter valid mobile number",
                }),
                setbutondisabled(true));
          case parentelement[index].id === "password" &&
            currentfoucs === "password":
            const nextvaluecheck = inputvalues("repassword");
            if (nextvaluecheck === "") {
              const passwordesult = passwordvalidation(
                parentelement[index].value
              );
              return passwordesult
                ? (setsignuperror({ ...signuperror, password: "" }),
                  signuperror.mobile === "" &&
                  signuperror.repeatpaswd === "" &&
                  signuperror.email === "" &&
                  signuperror.username === "" &&
                  othervalues
                    ? setbutondisabled(false)
                    : setbutondisabled(true))
                : (setsignuperror({
                    ...signuperror,
                    password: "Password atleast 8 character",
                  }),
                  setbutondisabled(true));
            } else {
              const samevaluecheck = e.currentTarget.value === nextvaluecheck;
              return samevaluecheck
                ? (setsignuperror({ ...signuperror, password: "" }),
                  signuperror.mobile === "" &&
                  signuperror.repeatpaswd === "" &&
                  signuperror.email === "" &&
                  signuperror.username === "" &&
                  othervalues
                    ? setbutondisabled(false)
                    : setbutondisabled(true))
                : (setsignuperror({
                    ...signuperror,
                    password: "Password not matching",
                  }),
                  setbutondisabled(true));
            }
          case parentelement[index].id === "repassword" &&
            currentfoucs === "repassword":
            const passwordcheck = inputvalues("password");
            if (passwordcheck === "") {
              const passwordesult = passwordvalidation(
                parentelement[index].value
              );
              return passwordesult
                ? (setsignuperror({ ...signuperror, repeatpaswd: "" }),
                  signuperror.mobile === "" &&
                  signuperror.password === "" &&
                  signuperror.email === "" &&
                  signuperror.username === "" &&
                  othervalues
                    ? setbutondisabled(false)
                    : setbutondisabled(true))
                : (setsignuperror({
                    ...signuperror,
                    repeatpaswd: "Password atleast 8 character",
                  }),
                  setbutondisabled(true));
            } else {
              const samevaluecheck = e.currentTarget.value === passwordcheck;
              return samevaluecheck
                ? (setsignuperror({ ...signuperror, repeatpaswd: "" }),
                  signuperror.mobile === "" &&
                  signuperror.password === "" &&
                  signuperror.email === "" &&
                  signuperror.username === "" &&
                  othervalues
                    ? setbutondisabled(false)
                    : setbutondisabled(true))
                : (setsignuperror({
                    ...signuperror,
                    repeatpaswd: "Password not matching",
                  }),
                  setbutondisabled(true));
            }
          default:
        }
      }
    } else {
      setsignuperror({
        username: "",
        email: "",
        mobile: "",
        password: "",
        repeatpaswd: "",
      });
      setbutondisabled(true);
    }
  };
  const signinfun = () => {
    localStorage.setItem("userinfo", inputvalues("username"));
    dispatch({type:'login',username:inputvalues("username")});
    setshowpop(!showpop);
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
                <div>
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={registerfun}
                  />
                  {signuperror.username !== "" ? (
                    <p className="error-class">{signuperror.username}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="email"
                    type="text"
                    placeholder="Emailaddress"
                    onChange={registerfun}
                  />
                  {signuperror.email !== "" ? (
                    <p className="error-class">{signuperror.email}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="mobilenumber"
                    type="text"
                    placeholder="Mobile number"
                    onChange={registerfun}
                  />
                  {signuperror.mobile !== "" ? (
                    <p className="error-class">{signuperror.mobile}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="password"
                    type="text"
                    placeholder="Password"
                    onChange={registerfun}
                  />
                  {signuperror.password !== "" ? (
                    <p className="error-class">{signuperror.password}</p>
                  ) : null}
                </div>
                <div>
                  <input
                    id="repassword"
                    type="text"
                    placeholder="Confirm password"
                    onChange={registerfun}
                  />
                  {signuperror.repeatpaswd !== "" ? (
                    <p className="error-class">{signuperror.repeatpaswd}</p>
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
                    setmode("signup");
                    setsigninerror({ username: "", password: "" });
                    setbutondisabled(true);
                    emptyinputfun();
                  }}
                >
                  click here
                </span>
              </div>
              <Button
                variant="primary"
                disabled={buttondisabled}
                onClick={signinfun}
              >
                Signin
              </Button>
            </>
          ) : (
            <>
              <div id="registerspan">
                <p>Already have account</p>
                <span
                  onClick={() => {
                    setmode("signin");
                    setbutondisabled(true);
                    setsignuperror({
                      username: "",
                      email: "",
                      mobile: "",
                      password: "",
                      repeatpaswd: "",
                    });
                    emptyinputfun();
                  }}
                >
                  click here
                </span>
              </div>
              <Button variant="primary" disabled={buttondisabled}>
                Signup
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
