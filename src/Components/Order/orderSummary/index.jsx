import Image2 from "../../../Images/home_image2.png";
export const Ordersummary = () => {
  return (
    <div id="root-summary">
      <div id="sub_root_sum">
        <div id="first_div_sum">
          <div id="sum_image">
            <img src={Image2} alt="" />
          </div>
          <div id="summ_add_remove">
            <button id="summ_minus">-</button>
            <input type="text" defaultValue={4} />
            <button id="summ_plus">+</button>
          </div>
        </div>
        <div id="second_div_sum">
          <div id="sum_text">
            <p id="summ_prd_heading">Cloth Covered Accent Chair</p>
            <div>
              <strike>₹15000</strike>
              <p>₹12000</p>
            </div>
            <div id="summ_button">
              <button>Save for later</button>
              <button>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
