import axios from 'axios';
export const Forgotusernameapi=async(data)=>{
const response = await axios.post(
    `http://localhost:4000/comfort-and-care/forgotusername`,
    { email:data },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    }
  );
  console.log(response.data);
  return response
}