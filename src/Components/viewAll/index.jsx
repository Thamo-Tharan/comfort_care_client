import { useState } from "react";
import Emptyimage from "../../Images/dont_have.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AddRemoveCart } from "../../Api/addRemoveCart";
export const ViewAllcomponent = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  console.log(params.product);
  const { cartInformation } = useSelector((state) => state.userCartInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const Getsofa = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getsofa",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setdata(response.data.sofa);
    } catch (error) {
      console.log(error);
    }
  };
  const Beambag = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getbeambag",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setdata(response.data.sofa);
    } catch (error) {
      console.log(error);
    }
  };
  const Bed = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getbed",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setdata(response.data.sofa);
    } catch (error) {
      console.log(error);
    }
  };
  const Chair = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getchair",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setdata(response.data.sofa);
    } catch (error) {
      console.log(error);
    }
  };
  const dressingtable = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getdressingtable",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setdata(response.data.sofa);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.product === "sofa") {
      Getsofa();
    } else if (params.product === "dressingtable") {
      dressingtable();
    } else if (params.product === "chair") {
      Chair();
    } else if (params.product === "bed") {
      Bed();
    } else {
      Beambag();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addtocart = async (item) => {
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
  const buynow = (data) => {
    navigate({
      pathname: "/order",
      search: `?itemName=${data._id}&item=${params.product}&type=buyNow`,
    });
  };
  return (
    <>
      <div id="save_latr"></div>
      {data.length !== 0 ? (
        <div id="wishlist_root">
          {data.map((data, index) => {
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
                        <button onClick={() => buynow(data)}>Buy now</button>
                        <button onClick={() => addtocart(data)}>
                          Add to cart
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
