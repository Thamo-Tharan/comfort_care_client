import "../../Styles/sofaComponent/index.css";
import Carousel from "react-multi-carousel";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AddRemoveWhistlist } from "../../Api/addRemoveWhistlist";
export const ChairComp = () => {
  const navigate = useNavigate();
  const [sofa, setsofa] = useState([]);
  const [initial, setInitial] = useState([]);
  const dispatch = useDispatch();
  const { whistlistInformation } = useSelector(
    (state) => state.userWhistlistInfo
  );
  const Getsofa = async () => {
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
      setsofa(response.data.sofa);
      dispatch({ type: "product", product: response.data.sofa });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getsofa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const addItems = async (data, index, event) => {
    console.log(data);
    console.log(event);
    const result = whistlistInformation.find(({ name }) => name === data.name);
    const arrOfKeys = [...initial]; // create a copy of initial array
    if (initial[index] === "red" || result) {
      arrOfKeys[parseInt(index)] = initial[index] = "black";
    } else {
      arrOfKeys[parseInt(index)] = initial[index] = "red";
    }
    setInitial(arrOfKeys); // update the state
    const allitems = [...whistlistInformation];
    allitems.push(data);
    if (initial[index] === "black" || arrOfKeys[index] === "black" || result) {
      const removerarry = whistlistInformation.filter(
        (value) => value.name !== data.name
      );
      try {
        const response = await AddRemoveWhistlist(removerarry);
        console.log(response);
        toast.success("Item removed from your wishlist");
        dispatch({ type: "clear", whistlist: removerarry });
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        const response = await AddRemoveWhistlist(allitems);
        console.log(response);
        dispatch({ type: "whistlist", whistlist: data });
        toast.success("Item added to your wishlist");
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const heiglistfun = (data, index) => {
    let componet = <></>;
    let condition = false;
    // eslint-disable-next-line array-callback-return
    whistlistInformation.map((item) => {
      if (item.name === data.name) {
        condition = true;
        return (componet = (
          <FaHeart
            style={{ color: "red", fontSize: "20px" }}
            onClick={() => addItems(data, index)}
          />
        ));
      }
    });
    return condition ? (
      componet
    ) : (
      <FaHeart
        style={{ color: initial[index], fontSize: "20px" }}
        onClick={() => addItems(data, index)}
      />
    );
  };
  const navigatetonext = (data) => {
    console.log(data);
    navigate({
      pathname: "/viewProduct",
      search: `?itemName=${data._id}&item=sofa`,
    });
  };
  return (
    <div id="sofa_items">
      <div id="sofa_com_root">
        <div id="sofa_text">
          <p>Chair Collections</p>
        </div>
        <div
          id="sofa_button"
          onClick={() =>
            navigate({ pathname: "/viewall", search: "?product=chair" })
          }
        >
          <button className="view_all">View all</button>
        </div>
      </div>
      <Carousel
        responsive={responsive}
        containerClass="carousel-container"
        transitionDuration={500}
        autoPlaySpeed={3000}
        infinite={true}
        autoPlay={false}
      >
        {sofa.map((data, index) => {
          return (
            <>
              <div id="sofa_root" key={index}>
                <div id="fav_icon_div">
                  <div></div>
                  <div id="wishlist_icon_div">
                    {whistlistInformation.length < 0 ? (
                      <FaHeart
                        style={{ color: initial[index], fontSize: "20px" }}
                        onClick={(event) => addItems(data, index, event)}
                      />
                    ) : (
                      heiglistfun(data, index)
                    )}
                  </div>
                </div>
                <div onClick={() => navigatetonext(data)}>
                  <img src={data.path} alt="preview" />
                  <p>{data.name}</p>
                  <p>{data.rating}</p>
                  <strike>₹ {data.price}/-</strike>
                  <p>₹ {data.offer}/-</p>
                </div>
              </div>
            </>
          );
        })}
      </Carousel>
    </div>
  );
};
