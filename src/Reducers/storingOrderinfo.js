const Orderinfo = {
  userinfo: "",
  selectadddress: "",
  orderproduct: "",
  paymentmode: "",
};
export const storingOrderinfo = (state = Orderinfo, action) => {
  switch (action.type) {
    case "login":
      return { ...state, userinfo: action.userinfo };
    case "address":
      return { ...state, selectadddress: action.selectadddress };
    case "orderproduct":
      return { ...state, orderproduct: action.orderproduct };
    case "paymentmode":
      return { ...state, paymentmode: action.paymentmode };
    default:
      return state;
  }
};
