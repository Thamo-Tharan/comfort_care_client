import axios from "axios";
export const Resetpasswordapi = async (data) => {
  const { id, token, password } = data;
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/reset-password/${id}/${token}`,
    { password: password },
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
