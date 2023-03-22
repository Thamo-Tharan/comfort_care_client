import axios from "axios";
export const Userregister = async (data) => {
  const { username, email, password, mobilenumber } = data;
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/createnewuser`,
    {
      username: username,
      email: email,
      passworddata: password,
      mobilenumber: mobilenumber,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(response.data);
  return response;
};
