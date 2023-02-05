import { useState } from "react";
import "../../../Styles/Profile/index.css";
export const ProfileInformation = () => {
  const [gender, setGender] = useState("");
  const [saveEnabled, setSaveEnabled] = useState("event-disable");
  const [mode, setMode] = useState("Edit");
  return (
    <div id="prof_info_root">
      <div>
        <div id="profile_head">
          <p>Profile Information</p>
          <span
            onClick={() => {
              setSaveEnabled((prev) => (prev === "" ? "event-disable" : ""));
              setMode((prev) => (prev === "Cancel" ? "Edit" : "Cancel"));
            }}
          >
            {mode}
          </span>
        </div>
        <div id="username_edit" className={saveEnabled}>
          <input id="username" type="text" placeholder="Username" />
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
          <input id="email" type="text" placeholder="Email" />
        </div>
      </div>
      <div className={saveEnabled}>
        <div id="profile_head">
          <p>Mobile Number</p>
        </div>
        <div id="username_edit">
          <input id="mobilenumber" type="text" placeholder="Mobilenumber" />
        </div>
      </div>
      {saveEnabled === "" ? (
        <div id="save_cancel_div">
          <button id="profile_save">Save</button>
          <button
            id="profile_cancel"
            onClick={() => {
              setSaveEnabled("event-disable");
              setMode("Edit");
            }}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </div>
  );
};
