import axios from "axios";
export const Userlogin = async (data) => {
  const { username, password } = data;
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/login`,
    { username: username, passworddata: password },
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
