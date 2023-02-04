/* eslint-disable react-hooks/exhaustive-deps */
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import "../../Styles/Order/index.css";
import { Orderaddress } from "./addressSelection";
import { useSelector } from "react-redux";
import { useEffect} from "react";
import { Ordersummary } from "./orderSummary";
import { Headerorder } from "./Header";
import { isEmpty } from "lodash";
import { Loginconfirm } from "./loginConfirm";
const getSelectors = (state) => state.userOrderinfo;
let orderob = { login: "", address: "" };
export const Order = () => {
  const { selectadddress } = useSelector(getSelectors);
  const userinfo = localStorage.getItem("userinfo");
  useEffect(() => {
    selectadddress !== ""
      ? (orderob.address = selectadddress)
      : (orderob.address = "");
    console.log(selectadddress);
  }, [selectadddress]);

  function step2Validator() {
    console.log(orderob.address);
    return orderob.address !== "";
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
      <Headerorder />
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: "Login",
            name: "step 1",
            content: !isEmpty(userinfo) ? <Loginconfirm /> : null,
          },
          {
            label: "Delivery Address",
            name: "step 2",
            content: <Orderaddress selectadddress={selectadddress} />,
            validator: step2Validator,
          },
          {
            label: "Order Summary",
            name: "step 3",
            content: <Ordersummary />,
          },
          {
            label: "Payment Options",
            name: "step 4",
            content: <></>,
            validator: step3Validator,
          },
        ]}
      />
    </>
  );
};
