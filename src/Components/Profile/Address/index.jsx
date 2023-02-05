/* eslint-disable react-hooks/exhaustive-deps */
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { useEffect, useState } from "react";
import { AddressSchema } from "../../../Validations/Address";
export const Address = () => {
  const [add_address_show, setadd_address_show] = useState(false);
  const [addressdata, setaddressdata] = useState([]);
  const [senddata, setsenddata] = useState([{}]);
  const [edit, setedit] = useState([]);
  const editfun = (data, e) => {
    const keynumber = parseInt(
      e.currentTarget.parentElement.parentElement.parentElement.getAttribute("data-key")
    );
    const arryofkeys = [];
    const datasend = [];
    datasend[keynumber] = data;
    arryofkeys[keynumber] = keynumber;
    setedit(arryofkeys);
    setsenddata(datasend);
  };
  const removerarry = (array, key) => array.filter((_,index) => index !== key);
  const removefun = (data, e) => {
    console.log(data);
    const keynumber = parseInt(
      e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
        "data-key"
      )
    );
    const arryofkeys = [...edit];
    const datasend = [...addressdata];
    const filterkeys = removerarry(arryofkeys, keynumber);
    const filterarray = removerarry(datasend, keynumber);
    setedit(filterkeys);
    setaddressdata(filterarray);
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
          setedit([]);
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
              value={values.mobileNumber}
              onChange={(value) =>
                setFieldValue("mobileNumber", value.currentTarget.value)
              }
            />
            {addressFromik.touched.mobileNumber &&
              addressFromik.errors.mobileNumber && (
                <span className="text-red-400">
                  {addressFromik.errors.mobileNumber}
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
            {addressFromik.touched.pinCode && addressFromik.errors.pinCode && (
              <span className="text-red-400">
                {addressFromik.errors.pinCode}
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
            onClick={() => {
              add_address_show === false
                ? setedit([])
                : setadd_address_show(!add_address_show);
            }}
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
                mobileNumber: "",
                pinCode: "",
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
        return edit[index] === index ? (
          <Customhookforaddress
            inputvalues={senddata[index]}
            keyvalue={index}
          />
        ) : (
          <div id="my_address" key={index} data-key={index}>
            <div id="add_heading">
              <div id="add_type">
                <p>{data.type}</p>
              </div>
              <div id="edit_type">
                <p onClick={(e) => editfun(data, e)}>Edit</p>
                <p onClick={(e) => removefun(data, e)}>Remove</p>
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
