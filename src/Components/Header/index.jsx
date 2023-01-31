import { useState } from "react";
import "../../Styles/Header/index.css";
import { Signupcom } from "../singnup";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
export const Header = (props) => {
  const { selectedColor } = props;
  const navigate = useNavigate();
  const [loginshow, setloginshow] = useState(false);
  const userinfo = localStorage.getItem("userinfo");
  return (
    <>
      <div id="header_root">
        <header>
          <div id="companyname_div">
            <p>Comfort and Care</p>
          </div>
          <div id="menu_items">
            <ol>
              <li className={selectedColor.Home} onClick={() => navigate("/")}>
                Home
              </li>
              <li className={selectedColor.Menu}>Menu</li>
              <li className={selectedColor.About}>About</li>
              <li className={selectedColor.Contact}>Contact</li>
            </ol>
          </div>
          <div id="icons_list">
            <ol>
              <li className={selectedColor.whistlist}>
                <span className="material-symbols-outlined">favorite</span>
              </li>
              <li className={selectedColor.cart}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              {isEmpty(userinfo) ? (
                <li onClick={() => setloginshow(true)}>
                  <button id="signin_home">Sign in</button>
                </li>
              ) : (
                <li
                  onClick={() => navigate("/profile")}
                  className={selectedColor.profile}
                >
                  <span className="material-symbols-outlined">person</span>
                </li>
              )}
            </ol>
          </div>
        </header>
      </div>
      <Signupcom showpop={loginshow} setshowpop={setloginshow} />
    </>
  );
};
