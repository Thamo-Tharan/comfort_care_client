import axios from "axios";
export const Updateprofile = async (data) => {
  const { username, gender, mobilenumber, email } = data;
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/profileupdate`,
    { username, gender, mobilenumber, email },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${userinformation.access_token}`,
      },
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response;
};
