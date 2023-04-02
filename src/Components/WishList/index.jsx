import "../../Styles/WishList/index.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AddRemoveWhistlist } from "../../Api/addRemoveWhistlist";
export const WishListItem = () => {
  const { whistlistInformation } = useSelector(
    (state) => state.userWhistlistInfo
  );
  console.log("whistList", whistlistInformation);
  const userinformation = JSON.parse(localStorage.getItem("userinfo"));
  const dispatch = useDispatch();
  const Getitems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/comfort-and-care/getwhistlist",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${userinformation.access_token}`,
          },
          withCredentials: true,
        }
      );
      console.log("response.data", response.data);
      dispatch({ type: "clear", whistlist: response.data.whistlist });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getitems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const removeItem = async (data) => {
    const removerarry = whistlistInformation.filter(
      (value) => value.name !== data.name
    );
    const response = await AddRemoveWhistlist(removerarry);
        console.log(response);
    toast.success("Item removed from your wishlist");
    dispatch({ type: "clear", whistlist: removerarry });
  };
  return (
    <div id="wishlist_root">
      {whistlistInformation.map((data, index) => {
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
                    <button>Save for later</button>
                    <button onClick={() => removeItem(data)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
