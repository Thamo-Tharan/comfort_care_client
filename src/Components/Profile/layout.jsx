import { useState } from "react";
import "../../Styles/Profile/index.css";
import { Address } from "./Address";
import { ProfileInformation } from "./Profileinformation";
import { MyOrder } from "./myOrder";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../Api/logout";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
export const ProfileLayout = () => {
  const [defaultColor, setDefaultColor] = useState({
    profile: "active",
    address: "",
    order: "",
  });
  const dispatch = useDispatch();
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const navigate = useNavigate();
  const [render, setRender] = useState(<ProfileInformation />);
  const layoutChangeFunction = (e) => {
    switch (e.currentTarget.firstChild.textContent) {
      case "person":
        return defaultColor.profile === "active"
          ? null
          : setRender(() => <ProfileInformation />)(
              setDefaultColor({
                ...defaultColor,
                profile: "active",
                address: "",
                order: "",
              })
            );
      case "home":
        return defaultColor.address === "active"
          ? null
          : setRender(<Address />)(
              setDefaultColor({
                ...defaultColor,
                address: "active",
                order: "",
                profile: "",
              })
            );
      case "list_alt":
        return defaultColor.order === "active"
          ? null
          : setRender(<MyOrder />)(
              setDefaultColor({
                ...defaultColor,
                order: "active",
                address: "",
                profile: "",
              })
            );
      default:
    }
  };
  const logoutfun = async () => {
    try {
      const response = await Logout();
      console.log(response);
      toast.success("successfully logged out");
      localStorage.setItem("userinfo", JSON.stringify("{}"));
      dispatch({ type: "clear", whistlist: [] });
      dispatch({ type: "cart clear", cart: [] });
      dispatch({ type: "savelater clear", savelater: [] });
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div id="profile_layout">
      <div id="profile_layout_parent">
        <div id="profile_div">
          {userinformation?.username?.substring(0, 1).toUpperCase()}
        </div>
        <div id="profile_info_div">
          <ol>
            <li className={defaultColor.profile} onClick={layoutChangeFunction}>
              <span className="material-symbols-outlined">person</span>
              Profile Information
            </li>
            <li className={defaultColor.address} onClick={layoutChangeFunction}>
              <span className="material-symbols-outlined">home</span>
              Manage Addresses
            </li>
            <li className={defaultColor.order} onClick={layoutChangeFunction}>
              <span className="material-symbols-outlined">list_alt</span>
              My Orders
            </li>
            <li onClick={() => logoutfun()}>
              <span className="material-symbols-outlined">logout</span>
              Logout
            </li>
          </ol>
        </div>
      </div>
      <div id="profile_content">{render}</div>
    </div>
  );
};
