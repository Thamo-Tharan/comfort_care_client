const orderInfo = {
  userinformation: "",
  selectAddress: [],
  orderProduct: [],
  paymentMode: "",
};
export const storingOrderInfo = (state = orderInfo, action) => {
  switch (action.type) {
    case "login":
      return { ...state, userinformation: action.username };
    case "address":
      return { ...state, selectAddress: action.selectAddress };
    case "orderProduct":
      return { ...state, orderProduct: action.orderProduct };
    case "paymentMode":
      return { ...state, paymentMode: action.paymentMode };
    default:
      return state;
  }
};
