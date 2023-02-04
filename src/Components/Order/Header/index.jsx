import { useState } from "react";
import "../../../Styles/Header/index.css";
import { Signupcom } from "../../singnup";
import { isEmpty } from "lodash";
export const Headerorder = () => {
  const [loginshow, setloginshow] = useState(true);
  const userinfo = localStorage.getItem("userinfo");
  return (
    <>
      <div id="header_root">
        <header>
          <div id="companyname_div">
            <p>Comfort and Care</p>
          </div>
        </header>
      </div>
      {isEmpty(userinfo) ? <Signupcom showpop={loginshow} setshowpop={setloginshow} />:null}
      
    </>
  );
};