/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddressSchema } from "../../../Validations/Address";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Updateaddress } from "../../../Api/updateAddress";
export const OrderAddress = (props) => {
  const { selectAddress } = props;
  const [addAddressShow, setAddAddressShow] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [sendData, setSendData] = useState([{}]);
  const dispatch = useDispatch();
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  //getting address
  const Getaddress = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getAddress",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      setAddressData(response.data.address);
    } catch (error) {
      console.log(error);
    }
  };
  const updateAddress = async (data) => {
    try {
      const todo = await Updateaddress(data);
      console.log(todo);
      toast.success("Sucessfull");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error", error.response.data.message);
    }
  };
  useEffect(() => {
    if (userinformation !== null) {
      Getaddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectedAddress = (data, e) => {
    const element = document.getElementsByClassName("select-address");
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove("delivery-address");
    }
    e.currentTarget.classList.add("delivery-address");
    dispatch({ type: "address", selectAddress: data });
  };
  const CustomHookForAddress = (props) => {
    const { inputValues, keyValue } = props;
    const addressForm = useFormik({
      initialValues: inputValues,
      validationSchema: AddressSchema,
      onSubmit: async (values) => {
        const prev = addressData;
        if (addAddressShow === false) {
          prev[keyValue] = values;
          setAddressData(prev);
        } else {
          prev.push(values);
          setAddressData(prev);
          setAddAddressShow(!addAddressShow);
        }
        await updateAddress(prev);
        console.log(prev);
      },
    });
    const countries = csc.getAllCountries();
    const updatedCountries = countries.map((country) => ({
      label: country.name,
      value: country.id,
      ...country,
    }));
    const updatedStates = (countryId) =>
      csc
        .getStatesOfCountry(countryId)
        .map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (stateId) =>
      csc
        .getCitiesOfState(stateId)
        .map((city) => ({ label: city.name, value: city.id, ...city }));
    const { values, setFieldValue, handleSubmit, setValues } = addressForm;

    useEffect(() => {}, [values]);
    return (
      <div id="new_add_input">
        <div id="add_type">
          <div>
            <label htmlFor="field-rain" className="radio-values">
              <input
                type="radio"
                value="Home"
                checked={values.type === "Home"}
                id="field-Home"
                onChange={(value) =>
                  setFieldValue("type", value.currentTarget.value)
                }
              />
              Home
              <input
                type="radio"
                value="Work"
                checked={values.type === "Work"}
                id="field-Work"
                onChange={(value) =>
                  setFieldValue("type", value.currentTarget.value)
                }
              />
              Work
            </label>
            {addressForm.touched.type && addressForm.errors.type && (
              <span className="text-red-400">{addressForm.errors.type}</span>
            )}
          </div>
        </div>
        <div id="first_div">
          <div id="name">
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={(value) =>
                setFieldValue("name", value.currentTarget.value)
              }
            />
            {addressForm.touched.name && addressForm.errors.name && (
              <span className="text-red-400">{addressForm.errors.name}</span>
            )}
          </div>
          <div id="mob">
            <input
              id="mob"
              type="text"
              placeholder="Mobile number"
              value={values.mobileNumber}
              onChange={(value) =>
                setFieldValue("mobileNumber", value.currentTarget.value)
              }
            />
            {addressForm.touched.mobileNumber &&
              addressForm.errors.mobileNumber && (
                <span className="text-red-400">
                  {addressForm.errors.mobileNumber}
                </span>
              )}
          </div>
          <div id="pin">
            <input
              id="pin"
              type="text"
              placeholder="pinCode"
              value={values.pinCode}
              onChange={(value) =>
                setFieldValue("pinCode", value.currentTarget.value)
              }
            />
            {addressForm.touched.pinCode && addressForm.errors.pinCode && (
              <span className="text-red-400">{addressForm.errors.pinCode}</span>
            )}
          </div>
          <div id="locality">
            <input
              id="locality"
              type="text"
              placeholder="Locality"
              value={values.locality}
              onChange={(value) =>
                setFieldValue("locality", value.currentTarget.value)
              }
            />
            {addressForm.touched.locality && addressForm.errors.locality && (
              <span className="text-red-400">
                {addressForm.errors.locality}
              </span>
            )}
          </div>
        </div>
        <div id="type_address">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Address"
            value={values.address}
            onChange={(value) =>
              setFieldValue("address", value.currentTarget.value)
            }
          />
          {addressForm.touched.address && addressForm.errors.address && (
            <span className="text-red-400">{addressForm.errors.address}</span>
          )}
        </div>
        <div id="state_div">
          <div>
            <Select
              id="country"
              name="country"
              label="country"
              placeholder="Choose Country"
              options={updatedCountries}
              value={values.country}
              onChange={(value) => {
                setValues(
                  { ...values, country: value, state: null, city: null },
                  false
                );
              }}
            />
            {addressForm.touched.country && addressForm.errors.country && (
              <span className="text-red-400">{addressForm.errors.country}</span>
            )}
          </div>
          <div>
            <Select
              id="state"
              name="state"
              placeholder="Choose State"
              options={updatedStates(
                values.country ? values.country.value : null
              )}
              value={values.state}
              onChange={(value) => {
                setValues({ ...values, state: value, city: null }, false);
              }}
            />
            {addressForm.touched.state && addressForm.errors.state && (
              <span className="text-red-400">{addressForm.errors.state}</span>
            )}
          </div>
          <div>
            <Select
              id="city"
              name="city"
              placeholder="Choose City"
              options={updatedCities(values.state ? values.state.value : null)}
              value={values.city}
              onChange={(value) => setFieldValue("city", value)}
            />
            {addressForm.touched.city && addressForm.errors.city && (
              <span className="text-red-400">{addressForm.errors.city}</span>
            )}
          </div>

          <div id="landmark">
            <input
              id="landmark"
              type="text"
              placeholder="Landmark(optional)"
              value={values.landmark}
              onChange={(value) =>
                setFieldValue("landmark", value.currentTarget.value)
              }
            />
          </div>
        </div>
        <div id="add_address_save">
          <button id="save" onClick={(e) => handleSubmit(e)}>
            Save
          </button>
          <button
            id="cancel"
            onClick={() => setAddAddressShow(!addAddressShow)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  return (
    <div id="address_root">
      <div>
        {addAddressShow ? (
          <CustomHookForAddress inputValues={sendData} />
        ) : (
          <div
            id="add_address_div"
            onClick={() => {
              setSendData({
                country: "",
                state: "",
                city: "",
                type: "",
                name: "",
                mobileNumber: "",
                pinCode: "",
                locality: "",
                address: "",
                landmark: "",
              });
              setAddAddressShow(!addAddressShow);
            }}
          >
            <span className="material-symbols-outlined">post_add</span>
            <p>Add Address</p>
          </div>
        )}
      </div>
      {addressData.map((data, index) => {
        return selectAddress === data ? (
          <div
            id="my_address"
            className="select-address delivery-address"
            key={index}
            data-key={index}
            onClick={(e) => selectedAddress(data, e)}
          >
            <div id="add_heading">
              <div id="add_type">
                <p>{data.type}</p>
              </div>
            </div>
            <div id="name_heading">
              <p>{data.name}</p>
              <p>{data.mobileNumber}</p>
            </div>
            <div id="add_value">
              <p>{data.address},</p>
              <p>{data.locality},</p>
              <p>{data.city.name},</p>
              <p>{data.state.name}-</p>
              <p id="pinCode">{data.pinCode}</p>
            </div>
          </div>
        ) : (
          <div
            id="my_address"
            className="select-address"
            key={index}
            data-key={index}
            onClick={(e) => selectedAddress(data, e)}
          >
            <div id="add_heading">
              <div id="add_type">
                <p>{data.type}</p>
              </div>
            </div>
            <div id="name_heading">
              <p>{data.name}</p>
              <p>{data.mobileNumber}</p>
            </div>
            <div id="add_value">
              <p>{data.address},</p>
              <p>{data.locality},</p>
              <p>{data.city.name},</p>
              <p>{data.state.name}-</p>
              <p id="pinCode">{data.pinCode}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
