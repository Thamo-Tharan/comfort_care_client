import axios from "axios";
export const Forgotpasswordapi = async (data) => {
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/forgot-password`,
    { email: data },
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
