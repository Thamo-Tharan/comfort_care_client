import { useState } from "react";
import "../../Styles/Header/index.css";
import { Signupcom } from "../singnup";
export const Header = () => {
  const [loginshow,setloginshow]=useState(false)
  return (
    <>
      <div id="header_root">
        <header>
          <div id="companyname_div">
            <p>Comfort and Care</p>
          </div>
          <div id="menu_items">
            <ol>
              <li>Home</li>
              <li>Menu</li>
              <li>About</li>
              <li>Contact</li>
            </ol>
          </div>
          <div id="icons_list">
            <ol>
              <li>
                <span className="material-symbols-outlined">favorite</span>
              </li>
              <li>
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              <li onClick={()=>setloginshow(true)}>
                <span className="material-symbols-outlined">person</span>
              </li>
            </ol>
          </div>
        </header>
      </div>
      <Signupcom showpop={loginshow} setshowpop={setloginshow}/>
    </>
  );
};
