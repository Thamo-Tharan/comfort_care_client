import { useState } from "react";
import "../../Styles/Profile/index.css";
import { Profileinformation } from "./Profileinformation";
import { Address } from "./Address";
export const Profilelayout = () => {
  const [defaultcolor, setdefault] = useState({
    profile: "active",
    address: "",
    order: "",
  });
  const [render, setrender] = useState(<Profileinformation />);
  const layoutchangefun = (e) => {
    switch (e.currentTarget.firstChild.textContent) {
      case "person":
        return defaultcolor.profile === "active"
          ? null
          : setrender(()=><Profileinformation />)(
              setdefault({
                ...defaultcolor,
                profile: "active",
                address: "",
                order: "",
              })
            );
      case "home":
        return defaultcolor.address === "active"
          ? null
          : setrender(<Address />)(
              setdefault({
                ...defaultcolor,
                address: "active",
                order: "",
                profile: "",
              })
            );
      case "list_alt":
        return defaultcolor.order === "active"
          ? null
          : setrender("")(
              setdefault({
                ...defaultcolor,
                order: "active",
                address: "",
                profile: "",
              })
            );
      default:
    }
  };
  return (
    <div id="profilelayout">
      <div id="profilelayout_parent">
        <div id="profile_div">TK</div>
        <div id="profile_info_div">
          <ol>
            <li className={defaultcolor.profile} onClick={layoutchangefun}>
              <span className="material-symbols-outlined">person</span>
              Profile Information
            </li>
            <li className={defaultcolor.address} onClick={layoutchangefun}>
              <span className="material-symbols-outlined">home</span>
              Manage Addresses
            </li>
            <li className={defaultcolor.order} onClick={layoutchangefun}>
              <span className="material-symbols-outlined">list_alt</span>
              My Orders
            </li>
            <li onClick={layoutchangefun}>
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
