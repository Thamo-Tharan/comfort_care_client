const cartInfo = {
    cartInformation: [],
  };
  export const storingCartInfo = (state = cartInfo, action) => {
    switch (action.type) {
      case "cart":
        return {
          ...state,
          cartInformation: state?.cartInformation?.concat(
            action.cart
          ),
        };
      case "cart clear":
        return { cartInformation: action.cart };
      default:
        return state;
    }
  };
  