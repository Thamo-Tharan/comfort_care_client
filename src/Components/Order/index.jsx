/* eslint-disable react-hooks/exhaustive-deps */
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import "../../Styles/Order/index.css";
import { OrderAddress } from "./addressSelection";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { OrderSummary } from "./orderSummary";
import { toast } from "react-toastify";
import { HeaderOrder } from "./Header";
import { isEmpty } from "lodash";
import { LoginConfirm } from "./loginConfirm";
import { SignUp } from "../signUp";
import { Payment } from "../payment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Orderproduct } from "../../Api/orderProduct";
import { AddRemoveCart } from "../../Api/addRemoveCart";
let orderObject = { login: localStorage.getItem("userinfo"), address: "" };
export const Order = () => {
  const getSelectors = (state) => state.userOrderInfo;
  const { selectAddress, userinformation, orderProduct} = useSelector(getSelectors);
  const [loginShow, setLoginShow] = useState(true);
  const [login, seLogin] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userinformationin = JSON.parse(localStorage.getItem("userinfo"));
  useEffect(() => {
    selectAddress !== ""
      ? (orderObject.address = selectAddress)
      : (orderObject.address = "");
    console.log(selectAddress);
    seLogin(userinformationin.username);
  }, [selectAddress, userinformation]);

  function step2Validator() {
    console.log(orderObject.address);
    return orderObject.address !== "";
  }

  function step3Validator() {
    // return a boolean
  }

  async function onFormSubmit() {
    console.log(orderProduct);
    try {
      const response = await Orderproduct(orderProduct);
      console.log(response);
      toast.success("Your Order has been successfully placed.");
      const response1 = await AddRemoveCart([]);
      console.log(response1);
      dispatch({ type: "cart clear", cart: [] });
      navigate("/")
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <>
      <HeaderOrder />
      {isEmpty(login) ? (
        <SignUp showPopup={loginShow} setShowPopup={setLoginShow} />
      ) : null}
      {!isEmpty(login) ? (
        <StepProgressBar
          startingStep={1}
          onSubmit={onFormSubmit}
          steps={[
            {
              label: "Login",
              name: "step 1",
              content: <LoginConfirm userName={login} />,
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
              content: <Payment />,
              validator: step3Validator,
            },
          ]}
        />
      ) : (
        <div id="order_signin">
          <button onClick={() => setLoginShow(true)}>Sign In</button>
        </div>
      )}
    </>
  );
};
