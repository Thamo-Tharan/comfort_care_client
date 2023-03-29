import { useEffect, useState } from "react";
import "../../../Styles/Profile/index.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Updateprofile } from "../../../Api/updateProfile";
export const ProfileInformation = () => {
  const [gender, setGender] = useState("");
  const [saveEnabled, setSaveEnabled] = useState("event-disable");
  const [profilevalue, setprofilevalue] = useState({
    username: "",
    email: "",
    mobilenumber: "",
  });
  const [mode, setMode] = useState("Edit");
  const [prevdata, setprevdata] = useState();
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const Getprofile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/profileinfo",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      setprevdata(response.data.profileinfo);
      setGender(response.data.profileinfo[0].gender);
      setprofilevalue({
        username: response.data.profileinfo[0].username,
        email: response.data.profileinfo[0].email,
        mobilenumber: response.data.profileinfo[0].mobilenumber,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userinformation !== null) {
      Getprofile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const profileSave = async () => {
    try {
      const data = {
        username: profilevalue.username,
        gender: gender,
        email: profilevalue.email,
        mobilenumber: profilevalue.mobilenumber,
      };
      const todo = await Updateprofile(data);
      console.log(todo);
      toast.success("Sucessfull");
      setMode("Edit");
      setSaveEnabled("event-disable");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error", error.response.data.message);
    }
  };
  return (
    <div id="prof_info_root">
      <div>
        <div id="profile_head">
          <p>Profile Information</p>
          <span
            onClick={() => {
              setSaveEnabled((prev) => (prev === "" ? "event-disable" : ""));
            }}
          >
            {mode}
          </span>
        </div>
        <div id="username_edit" className={saveEnabled}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={profilevalue.username}
            onChange={(e) => {
              setprofilevalue({
                ...profilevalue,
                username: e.currentTarget.value,
              });
            }}
          />
          <div>
            <label>Your Gender</label>
            <label htmlFor="field-rain" className="radio-values">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                id="field-Male"
                onChange={() => setGender("Male")}
              />
              Male
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                id="field-Female"
                onChange={() => setGender("Female")}
              />
              Female
            </label>
          </div>
        </div>
      </div>
      <div className={saveEnabled}>
        <div id="profile_head">
          <p>Email Address</p>
        </div>
        <div id="username_edit">
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={profilevalue.email}
            onChange={(e) => {
              setprofilevalue({
                ...profilevalue,
                email: e.currentTarget.value,
              });
            }}
          />
        </div>
      </div>
      <div className={saveEnabled}>
        <div id="profile_head">
          <p>Mobile Number</p>
        </div>
        <div id="username_edit">
          <input
            id="mobilenumber"
            type="text"
            placeholder="Mobilenumber"
            value={profilevalue.mobilenumber}
            onChange={(e) => {
              setprofilevalue({
                ...profilevalue,
                mobilenumber: e.currentTarget.value,
              });
            }}
          />
        </div>
      </div>
      {saveEnabled === "" ? (
        <div id="save_cancel_div">
          <button id="profile_save" onClick={profileSave}>
            Save
          </button>
          <button
            id="profile_cancel"
            onClick={() => {
              setSaveEnabled("event-disable");
              setMode("Edit");
              setprofilevalue({
                username: prevdata[0].username,
                email: prevdata[0].email,
                mobilenumber: prevdata[0].mobilenumber,
              });
            }}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};
