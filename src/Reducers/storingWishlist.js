const whistlistInfo = {
  whistlistInformation: [],
};
export const storingWhistlistInfo = (state = whistlistInfo, action) => {
  switch (action.type) {
    case "whistlist":
      return {
        ...state,
        whistlistInformation: state.cartdatauser.concat(action.whistlist),
      };
    case "clear":
      return { whistlistInformation: action.clear };
    default:
      return state;
  }
};
