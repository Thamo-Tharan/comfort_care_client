/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { useEffect, useState } from "react";
import { AddressSchema } from "../../../Validations/Address";
import { useDispatch } from "react-redux";
export const Orderaddress = (props) => {
  const {selectadddress}=props
  const [add_address_show, setadd_address_show] = useState(false);
  const [addressdata, setaddressdata] = useState([]);
  const [senddata, setsenddata] = useState([{}]);
  const dispatch = useDispatch();
  const selectedaddr = (data, e) => {
    const element = document.getElementsByClassName("select-address");
    for (let i = 0; i < element.length; i++) {
      element[i].classList.remove("delivery-address");
    }
    e.currentTarget.classList.add("delivery-address");
    dispatch({ type: "address", selectadddress: data });
  };
  const Customhookforaddress = (props) => {
    const { inputvalues, keyvalue } = props;
    const addressFromik = useFormik({
      initialValues: inputvalues,
      validationSchema: AddressSchema,
      onSubmit: (values) => {
        const prev = addressdata;
        if (add_address_show === false) {
          prev[keyvalue] = values;
          setaddressdata(prev);
        } else {
          prev.push(values);
          setaddressdata(prev);
          setadd_address_show(!add_address_show);
        }
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
    const { values, setFieldValue, handleSubmit, setValues } = addressFromik;

    useEffect(() => {}, [values]);
    return (
      <div id="newadd_inupt">
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
            {addressFromik.touched.type && addressFromik.errors.type && (
              <span className="text-red-400">{addressFromik.errors.type}</span>
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
            {addressFromik.touched.name && addressFromik.errors.name && (
              <span className="text-red-400">{addressFromik.errors.name}</span>
            )}
          </div>
          <div id="mob">
            <input
              id="mob"
              type="text"
              placeholder="Mobile number"
              value={values.mobilenumber}
              onChange={(value) =>
                setFieldValue("mobilenumber", value.currentTarget.value)
              }
            />
            {addressFromik.touched.mobilenumber &&
              addressFromik.errors.mobilenumber && (
                <span className="text-red-400">
                  {addressFromik.errors.mobilenumber}
                </span>
              )}
          </div>
          <div id="pin">
            <input
              id="pin"
              type="text"
              placeholder="Pincode"
              value={values.pincode}
              onChange={(value) =>
                setFieldValue("pincode", value.currentTarget.value)
              }
            />
            {addressFromik.touched.pincode && addressFromik.errors.pincode && (
              <span className="text-red-400">
                {addressFromik.errors.pincode}
              </span>
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
            {addressFromik.touched.locality &&
              addressFromik.errors.locality && (
                <span className="text-red-400">
                  {addressFromik.errors.locality}
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
          {addressFromik.touched.address && addressFromik.errors.address && (
            <span className="text-red-400">{addressFromik.errors.address}</span>
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
            {addressFromik.touched.country && addressFromik.errors.country && (
              <span className="text-red-400">
                {addressFromik.errors.country}
              </span>
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
            {addressFromik.touched.state && addressFromik.errors.state && (
              <span className="text-red-400">{addressFromik.errors.state}</span>
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
            {addressFromik.touched.city && addressFromik.errors.city && (
              <span className="text-red-400">{addressFromik.errors.city}</span>
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
            onClick={() => setadd_address_show(!add_address_show)}
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
        {add_address_show ? (
          <Customhookforaddress inputvalues={senddata} />
        ) : (
          <div
            id="add_address_div"
            onClick={() => {
              setsenddata({
                country: "",
                state: "",
                city: "",
                type: "",
                name: "",
                mobilenumber: "",
                pincode: "",
                locality: "",
                address: "",
                landmark: "",
              });
              setadd_address_show(!add_address_show);
            }}
          >
            <span className="material-symbols-outlined">post_add</span>
            <p>Add Address</p>
          </div>
        )}
      </div>
      {addressdata.map((data, index) => {
        return (
          selectadddress===data ? 
          <div
            id="myaddrees"
            className="select-address delivery-address"
            key={index}
            data-key={index}
            onClick={(e) => selectedaddr(data, e)}
          >
            <div id="add_heading">
              <div id="add_type">
                <p>{data.type}</p>
              </div>
            </div>
            <div id="name_heading">
              <p>{data.name}</p>
              <p>{data.mobilenumber}</p>
            </div>
            <div id="add_value">
              <p>{data.address},</p>
              <p>{data.locality},</p>
              <p>{data.city.name},</p>
              <p>{data.state.name}-</p>
              <p id="pincode">{data.pincode}</p>
            </div>
          </div>
          :
          <div
            id="myaddrees"
            className="select-address"
            key={index}
            data-key={index}
            onClick={(e) => selectedaddr(data, e)}
          >
            <div id="add_heading">
              <div id="add_type">
                <p>{data.type}</p>
              </div>
            </div>
            <div id="name_heading">
              <p>{data.name}</p>
              <p>{data.mobilenumber}</p>
            </div>
            <div id="add_value">
              <p>{data.address},</p>
              <p>{data.locality},</p>
              <p>{data.city.name},</p>
              <p>{data.state.name}-</p>
              <p id="pincode">{data.pincode}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
