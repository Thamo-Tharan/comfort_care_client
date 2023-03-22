import React, { useState,useEffect } from "react";
import '../../Styles/resetPassword/index.css'
import Imagelogo from "../../Images/resetpassword.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { passwordvalidation } from "../../Validations/Passwordvalidation";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";
import { Resetpasswordapi } from "../../Api/Resetpassword";
export const Restpasswordcomp = () => {
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [errorflag, seterrorflag] = useState({
    username: "",
    password: "",
    repassword: "",
    usernameflag: "",
    passwordflag: "",
    repasswordflag: "",
    submiteflag: "error-submit",
  });
  const URLdata=window.location.pathname
const res=URLdata.split("/")
  useEffect(() => {
      axios.get(`http://localhost:4000/comfort-and-care/reset-password/${res[2]}/${res[3]}`,{ withCredentials: true })
        .then(items => {
            console.log("okay");
        })
        .catch(error =>{
            console.log(error.response.statusText)
            alert(error.response.data.message)
            window.close();
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const passwordfun = (e) => {
    setpassword(e.target.value);
    if (e.target.value !== "") {
      const validation = passwordvalidation(e.target.value);
      if (repassword !== "") {
        if (e.target.value === repassword) {
          if (errorflag.repasswordflag === "" && repassword !== "") {
            seterrorflag({
              ...errorflag,
              passwordflag: "",
              password: "",
              submiteflag: "",
            });
          } else {
            seterrorflag({ ...errorflag, password: "", passwordflag: "" });
          }
        } else {
          seterrorflag({
            ...errorflag,
            passwordflag: "error-input",
            password: "Password is missmatching",
            submiteflag: "error-submit",
          });
        }
      } else {
        if (validation) {
          seterrorflag({
            ...errorflag,
            passwordflag: "",
            password: "",
          });
        } else {
          seterrorflag({
            ...errorflag,
            passwordflag: "error-input",
            password: "Password minimum of 8 characters",
            submiteflag: "error-submit",
          });
        }
      }
    } else {
      seterrorflag({ ...errorflag, passwordflag: "", password: "" });
    }
  };
  const repasswordfun = (e) => {
    setrepassword(e.target.value);
    if (e.target.value !== "") {
      if (password !== "") {
        if (e.target.value === password) {
          if (errorflag.passwordflag === "" && password !== "") {
            seterrorflag({
              ...errorflag,
              repasswordflag: "",
              repassword: "",
              submiteflag: "",
            });
          } else {
            seterrorflag({ ...errorflag, repassword: "", repasswordflag: "" });
          }
        } else {
          seterrorflag({
            ...errorflag,
            repasswordflag: "error-input",
            repassword: "Password is missmatching",
            submiteflag: "error-submit",
          });
        }
      } else {
        if (e.target.value.length >= 8) {
          seterrorflag({
            ...errorflag,
            repasswordflag: "",
            repassword: "",
          });
        } else {
          seterrorflag({
            ...errorflag,
            repasswordflag: "error-input",
            repassword: "Password minimum of 8 characters",
            submiteflag: "error-submit",
          });
        }
      }
    } else {
      seterrorflag({ ...errorflag, repasswordflag: "", repassword: "" });
    }
  };
  const mutation = useMutation({
    mutationFn: obj => {
      return Resetpasswordapi(obj)
    }
  })
  const submitfun = async(event) => {
    event.preventDefault();
    const obj = {
      id: res[2],
      token:res[3],
      password: password,
    };
    try {
      const todo = await mutation.mutateAsync(obj)
      console.log(todo)
      setpassword('');
      setrepassword('')
      seterrorflag({
        username: "",
    password: "",
    repassword: "",
    usernameflag: "",
    passwordflag: "",
    repasswordflag: "",
    submiteflag: "error-submit",
      })
      toast.success(todo.data.message)
    } catch (error) {
      toast.error(error.response.data.status)
      console.log("error",error.response.data.status)
    }
  };
  return (
    <>
   <div className="main">
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <div id="back_div">
                  <h2 className="form-title forgotusername-page">Reset Password</h2>
                </div>
                <form className="register-form" id="register-form">
                    <>
                      <div className="form-group">
                        <label>
                          <FontAwesomeIcon icon={faLock} />
                        </label>
                        <input
                          value={password}
                          type="password"
                          name="pass"
                          id="pass"
                          placeholder="Password"
                          onChange={passwordfun}
                        />
                      </div>
                      {errorflag.password !== "" ? (
                        <p className="error_tag_singin">{errorflag.password}</p>
                      ) : null}
                      <div className="form-group">
                        <label>
                          <FontAwesomeIcon icon={faLock} />
                        </label>
                        <input
                          value={repassword}
                          type="password"
                          name="re_pass"
                          id="re_pass"
                          placeholder="Repeat your password"
                          onChange={repasswordfun}
                        />
                      </div>
                      {errorflag.repassword !== "" ? (
                        <p className="error_tag_singin">
                          {errorflag.repassword}
                        </p>
                      ) : null}
                    </>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className={`form-submit ${errorflag.submiteflag}`}
                      onClick={submitfun}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img
                    className="forgot-password-img"
                    src={Imagelogo}
                    alt="sing_up_image"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
