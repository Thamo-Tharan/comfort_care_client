import "../../../Styles/Header/index.css";
import { useNavigate } from "react-router-dom";
export const HeaderOrder = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="header_root">
        <header>
          <div id="company_name_div" onClick={() => navigate("/")}>
            <p>Comfort and Care</p>
          </div>
        </header>
      </div>
    </>
  );
};
