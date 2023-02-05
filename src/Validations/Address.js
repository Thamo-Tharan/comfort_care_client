import * as Yup from "yup";
export const AddressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  mobileNumber: Yup.string().min(10, "Phone number is not valid").max(10, "Phone number is not valid").required("Required"),
  pinCode: Yup.string().min(6, "Pin code is not valid").max(6, "Pin code is not valid").required("Required"),
  locality: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  country: Yup.object().nullable().required("Required"),
  state:  Yup.object().nullable().required("Required"),
  city:  Yup.object().nullable().required("Required"),
  type: Yup.string().required("Required"),
});
