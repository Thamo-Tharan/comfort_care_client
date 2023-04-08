import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/viewSingleProduct/index.css";
import { useSelector } from "react-redux";
import { AddRemoveCart } from "../../Api/addRemoveCart";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
export const ViewSingle = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log(params.itemName);
  console.log(params.item);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setitem] = useState([]);
  const { productInformation } = useSelector((state) => state.allProductInfo);
  const { cartInformation } = useSelector((state) => state.userCartInfo);
  console.log(productInformation);
  useEffect(() => {
    const result = productInformation.filter(
      (data) => data._id === params.itemName
    );
    console.log("dattaa", result);
    setitem(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addCart = async () => {
    let product = cartInformation.concat(item);
      let uniqueArray = Array.from(new Set(product.map(JSON.stringify))).map(
        JSON.parse
      );
    try {
      const response = await AddRemoveCart(uniqueArray);
      console.log(response);
      dispatch({ type: "cart clear", cart: uniqueArray });
      toast.success("Item added to your Cart");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div id="root_single_product">
      <div id="sub_root_singleproduct">
        <div id="heading_div_product">
          <p id="heading_product">{item[0]?.name}</p>
          <p id="heading_product">Offer details</p>
        </div>
        <div id="child_root_product">
          <div id="image_root_product">
            <div>
              <img src={item[0]?.path} alt="preview" />
            </div>
            <div id="button_div_product">
              <button id="add_cart" onClick={() => addCart()}>
                Add to cart
              </button>
              <button
                id="buy_now"
                onClick={() =>
                  navigate({
                    pathname: "/order",
                    search: `?itemName=${params.itemName}&item=${params.item}&type=buyNow`,
                  })
                }
              >
                Buy now
              </button>
            </div>
          </div>
          <div id="price_details_div">
            <div id="offers_product">
              <p className="avliable-offer">Available offers</p>
              <div>
                <p>
                  Bank Offer10% off on DBS Bank Debit and Credit Card
                  Transactions, up to ₹1500. On orders of ₹5,000 and above
                </p>
              </div>
              <div>
                <p>Bank Offer5% Cashback on Axis Bank Card</p>
              </div>
              <div>
                <p>
                  Bank Offer₹5,000 discount on HDFC credit and debit card emi
                  txrn
                </p>
              </div>
            </div>
            <div id="offer_price_div">
              <div>
                <p className="first-bold">Orginal Price:</p>
                <strike>₹ {item[0]?.price}/-</strike>
              </div>
              <div>
                <p className="first-bold">Price:</p>
                <p>₹ {item[0]?.offer}/-</p>
              </div>
              <div>
                <p className="first-bold">Reviews:</p>
                <p>{item[0]?.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
