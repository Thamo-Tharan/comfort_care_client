const whistlistInfo = {
  whistlistInformation: [],
};
export const storingWhistlistInfo = (state = whistlistInfo, action) => {
  switch (action.type) {
    case "whistlist":
      return {
        ...state,
        whistlistInformation: state?.whistlistInformation?.concat(
          action.whistlist
        ),
      };
    case "clear":
      return { whistlistInformation: action.whistlist };
    default:
      return state;
  }
};
