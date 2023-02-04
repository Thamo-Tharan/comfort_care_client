import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image1 from "../../Images/home_image1.png";
import Image2 from "../../Images/home_image2.png";
import Image3 from "../../Images/home_image3.webp";
import Image4 from "../../Images/home_image4.webp";
import Image5 from "../../Images/home_image5.webp";
import "../../Styles/homeImages/index.css";
export const HomeImage = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
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
    <>
      <Carousel
        responsive={responsive}
        containerClass="carousel-container"
        transitionDuration={500}
        autoPlaySpeed={3000}
        infinite={true}
        autoPlay={false}
      >
        <div className="home-image-auto">
          <div id="text_head">
            <p id="normal_text_price">Great Design Collection</p>
            <p className="bold-headed">Cloth Covered Accent Chair</p>
            <p id="description">Lorem</p>
            <strike id="normal_text_price">₹ 15,000</strike>
            <p id="normal_text_price">₹ 12,000</p>
            <button>Buy now</button>
          </div>
          <div id="image_auto_div">
            <img src={Image1} alt="" />
          </div>
        </div>
        <div className="home-image-auto">
          <div id="text_head">
            <p id="normal_text_price">Great Design Collection</p>
            <p className="bold-headed">Cloth Covered Accent Chair</p>
            <p id="description">abcd</p>
            <strike id="normal_text_price">₹ 15,000</strike>
            <p id="normal_text_price">₹ 12,000</p>
            <button>Buy now</button>
          </div>
          <div id="image_auto_div">
            <img src={Image2} alt="" />
          </div>
        </div>
        <div className="home-image-auto">
          <div id="text_head">
            <p id="normal_text_price">Great Design Collection</p>
            <p className="bold-headed">Cloth Covered Accent Chair</p>
            <p id="description">abcd</p>
            <strike id="normal_text_price">₹ 15,000</strike>
            <p id="normal_text_price">₹ 12,000</p>
            <button>Buy now</button>
          </div>
          <div id="image_auto_div">
            <img src={Image3} alt="" />
          </div>
        </div>
        <div className="home-image-auto">
          <div id="text_head">
            <p id="normal_text_price">Great Design Collection</p>
            <p className="bold-headed">Cloth Covered Accent Chair</p>
            <p id="description">abcd</p>
            <strike id="normal_text_price">₹ 15,000</strike>
            <p id="normal_text_price">₹ 12,000</p>
            <button>Buy now</button>
          </div>
          <div id="image_auto_div">
            <img src={Image4} alt="" />
          </div>
        </div>
        <div className="home-image-auto">
          <div id="text_head">
            <p id="normal_text_price">Great Design Collection</p>
            <p className="bold-headed">Cloth Covered Accent Chair</p>
            <p id="description">abcd</p>
            <strike id="normal_text_price">₹ 15,000</strike>
            <p id="normal_text_price">₹ 12,000</p>
            <button>Buy now</button>
          </div>
          <div id="image_auto_div">
            <img src={Image5} alt="" />
          </div>
        </div>
      </Carousel>
    </>
  );
};
