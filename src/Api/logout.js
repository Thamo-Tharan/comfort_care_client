import axios from 'axios';
export const Logout=async()=>{
const response = await axios.get(
    `http://localhost:4000/logout`,{
      withCredentials: true,
    }
  );
  console.log(response.data);
 return response
}