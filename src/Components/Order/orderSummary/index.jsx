import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const OrderSummary = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const { productInformation } = useSelector((state) => state.allProductInfo);
  const [item, setitem] = useState([]);
  useEffect(() => {
    if (params.type === "buyNow") {
      const result = productInformation.filter(
        (data) => data._id === params.itemName
      );
      console.log("dattaa", result);
      setitem(result);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div id="root-summary">
      {item.map((data, index) => {
        return (
          <div id="sub_root_sum" key={index}>
            <div id="first_div_sum">
              <div id="sum_image">
                <img src={data.path} alt="" />
              </div>
              {/* <div id="sum_add_remove">
                <button id="sum_minus">-</button>
                <input type="text" defaultValue={4} />
                <button id="sum_plus">+</button>
              </div> */}
            </div>
            <div id="second_div_sum">
              <div id="sum_text">
                <p id="sum_prd_heading">{data.name}</p>
                <div>
                  <strike>₹ {data.price}/-</strike>
                  <p>₹ {data.offer}/-</p>
                </div>
                <div id="sum_button">
                  <button>Save for later</button>
                  <button>Remove</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
