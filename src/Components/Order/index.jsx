/* eslint-disable react-hooks/exhaustive-deps */
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import "../../Styles/Order/index.css";
import { OrderAddress } from "./addressSelection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { OrderSummary } from "./orderSummary";
import { HeaderOrder } from "./Header";
import { isEmpty } from "lodash";
import { LoginConfirm } from "./loginConfirm";
import { SignUp } from "../signUp";
const getSelectors = (state) => state.userOrderInfo;
let orderObject = { login:localStorage.getItem("userinfo") , address: "" };
export const Order = () => {
  const { selectAddress, userinformation } = useSelector(getSelectors);
  const [loginShow, setLoginShow] = useState(true);
  const[login,seLogin]=useState('')
  useEffect(() => {
    selectAddress !== ""
      ? (orderObject.address = selectAddress)
      : (orderObject.address = "");
    console.log(selectAddress);
    seLogin(localStorage.getItem("userinfo"))
  }, [selectAddress,userinformation]);

  function step2Validator() {
    console.log(orderObject.address);
    return orderObject.address !== "";
  }

  function step3Validator() {
    // return a boolean
  }

  function onFormSubmit(e) {
    console.log(e);
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }
  return (
    <>
      <HeaderOrder />
      {isEmpty(login) ? <SignUp showPopup={loginShow} setShowPopup={setLoginShow} />:null}
      {!isEmpty(login) ?  <StepProgressBar
        startingStep={1}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: "Login",
            name: "step 1",
            content:<LoginConfirm userName={login}/>,
          },
          {
            label: "Delivery Address",
            name: "step 2",
            content: <OrderAddress selectAddress={selectAddress} />,
            validator: step2Validator,
          },
          {
            label: "Order Summary",
            name: "step 3",
            content: <OrderSummary />,
          },
          {
            label: "Payment Options",
            name: "step 4",
            content: <></>,
            validator: step3Validator,
          },
        ]}
      /> : <div id="order_signin"><button onClick={()=>setLoginShow(true)}>Sign In</button></div>}
     
    </>
  );
};
