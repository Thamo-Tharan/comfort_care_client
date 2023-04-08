import axios from "axios";
export const AddRemovesavelater = async (data) => {
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const response = await axios.post(
    `http://localhost:4000/comfort-and-care/add-remove-savelater`,
    {
        savelater: data,
    },
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
