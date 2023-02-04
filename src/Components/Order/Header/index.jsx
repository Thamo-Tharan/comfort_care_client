import { useState } from "react";
import "../../../Styles/Header/index.css";
import { isEmpty } from "lodash";
import { SignUp } from "../../signUp";
export const HeaderOrder = () => {
  const [loginShow, setLoginShow] = useState(true);
  const userinfo = localStorage.getItem("userinfo");
  return (
    <>
      <div id="header_root">
        <header>
          <div id="company_name_div">
            <p>Comfort and Care</p>
          </div>
        </header>
      </div>
      {isEmpty(userinfo) ? <SignUp showPopup={loginShow} setShowPopup={setLoginShow} />:null}
      
    </>
  );
};