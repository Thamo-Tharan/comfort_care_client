import axios from "axios";
export const Addressinfo = async () => {
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const response = await axios.get(
    `http://localhost:4000/comfort-and-care/getAddress`,
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
