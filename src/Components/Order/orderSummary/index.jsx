import Image2 from "../../../Images/home_image2.png";
export const OrderSummary = () => {
  return (
    <div id="root-summary">
      <div id="sub_root_sum">
        <div id="first_div_sum">
          <div id="sum_image">
            <img src={Image2} alt="" />
          </div>
          <div id="sum_add_remove">
            <button id="sum_minus">-</button>
            <input type="text" defaultValue={4} />
            <button id="sum_plus">+</button>
          </div>
        </div>
        <div id="second_div_sum">
          <div id="sum_text">
            <p id="sum_prd_heading">Cloth Covered Accent Chair</p>
            <div>
              <strike>₹15000</strike>
              <p>₹12000</p>
            </div>
            <div id="sum_button">
              <button>Save for later</button>
              <button>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
