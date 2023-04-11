import "../../Styles/addCart/index.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddRemoveCart } from "../../Api/addRemoveCart";
import { AddRemovesavelater } from "../../Api/addRemoveSaveLater";
import Emptyimage from "../../Images/dont_have.png";
export const Addtocarttem = () => {
  const { cartInformation } = useSelector((state) => state.userCartInfo);
  const { saveLaterInformation } = useSelector(
    (state) => state.userSaveLaterInfo
  );
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Getitems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getcart",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "cart clear", cart: response.data.cart });
    } catch (error) {
      console.log(error);
    }
  };
  const Getsavelater = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getsavelater",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "savelater clear", savelater: response.data.savelater });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getitems();
    Getsavelater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeItem = async (data) => {
    const removerarry = cartInformation.filter(
      (value) => value.name !== data.name
    );
    const response = await AddRemoveCart(removerarry);
    console.log(response);
    toast.success("Item removed from your Cart");
    dispatch({ type: "cart clear", cart: removerarry });
  };
  const addsavelater = async (data) => {
    let product = saveLaterInformation.concat(data);
    let uniqueArray = Array.from(new Set(product.map(JSON.stringify))).map(
      JSON.parse
    );
    try {
      const response = await AddRemovesavelater(uniqueArray);
      console.log(response);
      dispatch({ type: "savelater clear", savelater: uniqueArray });
      const removerarry = cartInformation.filter(
        (value) => value.name !== data.name
      );
      const response1 = await AddRemoveCart(removerarry);
      console.log(response1);
      dispatch({ type: "cart clear", cart: removerarry });
      toast.success("Item saved for later");
    } catch (error) {
      toast.error(error);
    }
  };
  const removesavelater = async (data) => {
    const removerarry = saveLaterInformation.filter(
      (value) => value.name !== data.name
    );
    const response = await AddRemovesavelater(removerarry);
    console.log(response);
    toast.success("Item removed");
    dispatch({ type: "savelater clear", savelater: removerarry });
  };
  const addCart = async (data) => {
    let product = cartInformation.concat(data);
    let uniqueArray = Array.from(new Set(product.map(JSON.stringify))).map(
      JSON.parse
    );
    try {
      const response = await AddRemoveCart(uniqueArray);
      console.log(response);
      dispatch({ type: "cart clear", cart: uniqueArray });
      const removerarry = saveLaterInformation.filter(
        (value) => value.name !== data.name
      );
      const response1 = await AddRemovesavelater(removerarry);
      console.log(response1);
      dispatch({ type: "savelater clear", savelater: removerarry });
      toast.success("Item added to your Cart");
    } catch (error) {
      toast.error(error);
    }
  };
  const placeOrder=()=>{
    navigate({
      pathname: "/order",
      search: `?itemName=''&item=''&type=cart`,
    })
  }
  return (
    <>
      <div id="save_latr">
        <div>
          <p>Your Cart</p>
        </div>
      </div>
      {cartInformation.length !== 0 ? (
        <div id="wishlist_root">
          {cartInformation.map((data, index) => {
            return (
              <>
                <div id="sub_root_sum" key={index}>
                  <div id="first_div_sum">
                    <div id="sum_image" className="sum_image_whist_list">
                      <img src={data.path} alt="" />
                    </div>
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
              </>
            );
          })}
        </div>
      ) : (
        <div className="empty-div">
          <img src={Emptyimage} alt="" />
        </div>
      )}
      {cartInformation.length !== 0 ? (
        <div id="place_order">
          <button onClick={()=> placeOrder()}>Place Order</button>
        </div>
      ) : null}

      <div id="save_latr">
        <div>
          <p>Saved for later</p>
        </div>
      </div>
      {saveLaterInformation.length !== 0 ? (
        <div id="wishlist_root">
          {saveLaterInformation.map((data, index) => {
            return (
              <>
                <div id="sub_root_sum" key={index}>
                  <div id="first_div_sum">
                    <div id="sum_image" className="sum_image_whist_list">
                      <img src={data.path} alt="" />
                    </div>
                  </div>
                  <div id="second_div_sum">
                    <div id="sum_text">
                      <p id="sum_prd_heading">{data.name}</p>
                      <div>
                        <strike>₹ {data.price}/-</strike>
                        <p>₹ {data.offer}/-</p>
                      </div>
                      <div id="sum_button">
                        <button onClick={() => addCart(data)}>
                          Add to cart
                        </button>
                        <button onClick={() => removesavelater(data)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <div className="empty-div">
          <img src={Emptyimage} alt="" />
        </div>
      )}
    </>
  );
};
