import { useEffect, useState } from "react";
import axios from "axios";
export const MyOrder = () => {
  const [initial, setInitial] = useState([]);
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const Getorder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getorderProduct",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      setInitial(response.data.myorder);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getorder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div id="myorder_root">
        {initial.map((data, index) => {
          return (
            <div id="sub_root_myorder" key={index}>
              <div>
                <p>#Order id {data.id}</p>
              </div>

              <div id="order_images">
                {data.product.map((item, key) => {
                  return (
                    <div key={key}>
                        <p>{item.name}</p>
                      <img src={item.path} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};
