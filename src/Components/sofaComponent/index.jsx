import Image1 from "../../Images/home_image1.png";
import "../../Styles/sofaComponent/index.css";
import Carousel from "react-multi-carousel";
import { FaHeart } from "react-icons/fa";
import "react-multi-carousel/lib/styles.css";
import Image5 from "../../Images/home_image5.webp";
export const SofaComp = () => {
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
  return (
    <div id="sofa_items">
      <div id="sofa_com_root">
        <div id="sofa_text">
          <p>Sofa Collections</p>
        </div>
        <div id="sofa_button">
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
        <div id="sofa_root">
          <div id="fav_icon_div">
            <div></div>
            <div>
              <FaHeart />
            </div>
          </div>
          <div>
            <img src={Image5} alt="" />
            <p>product name</p>
            <p>rating count</p>
            <strike>1,000</strike>
            <p>500</p>
          </div>
        </div>
        <div id="sofa_root">
          <div id="fav_icon_div">
            <div></div>
            <div>
              <FaHeart />
            </div>
          </div>
          <div>
            <img src={Image1} alt="" />
            <p>product name</p>
            <p>rating count</p>
            <strike>1,000</strike>
            <p>500</p>
          </div>
        </div>
        <div id="sofa_root">
          <div id="fav_icon_div">
            <div></div>
            <div>
              <FaHeart />
            </div>
          </div>
          <div>
            <img src={Image1} alt="" />
            <p>product name</p>
            <p>rating count</p>
            <strike>1,000</strike>
            <p>500</p>
          </div>
        </div>
        <div id="sofa_root">
          <div id="fav_icon_div">
            <div></div>
            <div>
              <FaHeart />
            </div>
          </div>
          <div>
            <img src={Image1} alt="" />
            <p>product name</p>
            <p>rating count</p>
            <strike>1,000</strike>
            <p>500</p>
          </div>
        </div>
        <div id="sofa_root">
          <div id="fav_icon_div">
            <div></div>
            <div>
              <FaHeart />
            </div>
          </div>
          <div>
            <img src={Image1} alt="" />
            <p>product name</p>
            <p>rating count</p>
            <strike>1,000</strike>
            <p>500</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
