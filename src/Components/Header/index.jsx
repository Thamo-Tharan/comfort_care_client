import { useState } from "react";
import "../../Styles/Header/index.css";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../signUp";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
export const Header = (props) => {
  const { selectedColor } = props;
  const { whistlistInformation } = useSelector(
    (state) => state.userWhistlistInfo
  );
  const { cartInformation } = useSelector((state) => state.userCartInfo);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const userinfo = JSON.parse(localStorage.getItem("userinfo"));
  const dispatch = useDispatch();
  const Getitems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getwhistlist",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinfo.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "clear", whistlist: response.data.whistlist });
    } catch (error) {
      console.log(error);
    }
  };
  const Getsavelater = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getsavelater",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinfo.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "savelater clear", savelater: response.data.savelater });
    } catch (error) {
      console.log(error);
    }
  };
  const Getcart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getcart",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinfo.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "cart clear", cart: response.data.cart });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getitems();
    Getsavelater();
    Getcart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <li
                className={selectedColor.About}
                onClick={() => navigate("/about")}
              >
                About
              </li>
              {/* <li className={selectedColor.Contact}>Contact</li> */}
            </ol>
          </div>
          <div id="icons_list">
            <ol>
              <li
                className={selectedColor.Wishlist}
                onClick={() => navigate("/wishlist")}
              >
                <span className="material-symbols-outlined">favorite</span>
                <NotificationBadge
                  count={whistlistInformation?.length}
                  effect={Effect.SCALE}
                />
              </li>
              <li
                className={selectedColor.Cart}
                onClick={() => navigate("/viewCart")}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <NotificationBadge
                  count={cartInformation?.length}
                  effect={Effect.SCALE}
                />
              </li>
              {userinfo === "{}" ? (
                <li onClick={() => setShowLogin(true)}>
                  <button id="sign_in_home">Sign in</button>
                </li>
              ) : (
                <>
                  <li
                    onClick={() => navigate("/profile")}
                    className={selectedColor.profile}
                  >
                    <span className="material-symbols-outlined">person</span>
                  </li>
                  {userinfo.username === "Thamotharan" ||
                  userinfo.username === "Sai" ? (
                    <li
                      onClick={() => navigate("/uploads")}
                      className={selectedColor.profile}
                    >
                      <span className="material-symbols-outlined">
                        playlist_add_check_circle
                      </span>
                    </li>
                  ) : null}
                </>
              )}
            </ol>
          </div>
        </header>
      </div>
      <SignUp showPopup={showLogin} setShowPopup={setShowLogin} />
    </>
  );
};
