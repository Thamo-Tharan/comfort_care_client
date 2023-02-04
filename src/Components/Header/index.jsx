import { useState } from "react";
import "../../Styles/Header/index.css";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../signUp";
export const Header = (props) => {
  const { selectedColor } = props;
  const navigate = useNavigate();
  const [showLogin,setShowLogin] = useState(false);
  const userinfo = localStorage.getItem("userinfo");
  return (
    <>
      <div id="header_root">
        <header>
          <div id="company_name_div">
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
              <li className={selectedColor.Wishlist}>
                <span className="material-symbols-outlined">favorite</span>
              </li>
              <li className={selectedColor.Cart}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              {isEmpty(userinfo) ? (
                <li onClick={() => setShowLogin(true)}>
                  <button id="sign_in_home">Sign in</button>
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
      <SignUp showPopup={showLogin} setShowPopup={setShowLogin} />
    </>
  );
};
