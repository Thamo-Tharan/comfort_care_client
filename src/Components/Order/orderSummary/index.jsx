import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddRemovesavelater } from "../../../Api/addRemoveSaveLater";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Emptyimage from "../../../Images/dont_have.png";
export const OrderSummary = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const { productInformation } = useSelector((state) => state.allProductInfo);
  const { cartInformation } = useSelector((state) => state.userCartInfo);
  const [item, setitem] = useState([]);
  const [order, setorder] = useState(0);
  const dispatch = useDispatch();
  const { saveLaterInformation } = useSelector(
    (state) => state.userSaveLaterInfo
  );
  useEffect(() => {
    if (params.type === "buyNow") {
      const result = productInformation.filter(
        (data) => data._id === params.itemName
      );
      console.log("dattaa", result);
      setitem(result);
      dispatch({ type: "orderProduct", orderProduct: result });
      let total = 0;
      for (let i = 0; i < result.length; i++) {
        //loop through the array
        total += parseInt(result[i].offer); //Do the math!
      }
      setorder(total);
    }else{
      setitem(cartInformation)
      let total = 0;
      for (let i = 0; i < cartInformation.length; i++) {
        //loop through the array
        total += parseInt(cartInformation[i].offer); //Do the math!
      }
      setorder(total);
      dispatch({ type: "orderProduct", orderProduct: cartInformation });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addsavelater = async (data) => {
    let product = saveLaterInformation.concat(data);
    let uniqueArray = Array.from(new Set(product.map(JSON.stringify))).map(
      JSON.parse
    );
    try {
      const response = await AddRemovesavelater(uniqueArray);
      console.log(response);
      dispatch({ type: "savelater clear", savelater: uniqueArray });
      const removerarry = item.filter((value) => value.name !== data.name);
      setitem(removerarry);
      toast.success("Item saved for later");
    } catch (error) {
      toast.error(error);
    }
  };
  const removeItem = (data) => {
    const removerarry = item.filter((value) => value.name !== data.name);
    setitem(removerarry);
  };
  return (
    <div id="root-summary">
      {item.length !== 0 ? (
        item.map((data, index) => {
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
                    <button onClick={() => addsavelater(data)}>
                      Save for later
                    </button>
                    <button onClick={() => removeItem(data)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="empty-div">
          <img src={Emptyimage} alt="" />
        </div>
      )}
      <div id="order_total">Order total : {order}</div>
    </div>
  );
};
