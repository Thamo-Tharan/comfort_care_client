const productinfo = {
  productInformation: [],
};
export const storingProductInformationInfo = (state = productinfo, action) => {
  switch (action.type) {
    case "product":
      let product = state.productInformation.concat(action.product);

      let uniqueArray = Array.from(new Set(product.map(JSON.stringify))).map(
        JSON.parse
      );
      console.log(uniqueArray);
      return {
        ...state,
        productInformation: uniqueArray,
      };
    default:
      return state;
  }
};
