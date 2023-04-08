const saveLaterInfo = {
    saveLaterInformation: [],
  };
  export const storingSaveLaterInfo = (state = saveLaterInfo, action) => {
    switch (action.type) {
      case "savelater":
        return {
          ...state,
          saveLaterInformation: state?.saveLaterInformation?.concat(
            action.savelater
          ),
        };
      case "savelater clear":
        return { saveLaterInformation: action.savelater };
      default:
        return state;
    }
  };
  