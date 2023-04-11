import axios from "axios";
export const Orderproduct = async (data) => {
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/orderproduct`,
    { product: data },
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
