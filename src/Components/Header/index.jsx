import "../../Styles/Header/index.css";
export const Header = () => {
  return (
    <>
      <div id="header_root">
        <header>
          <div id="companyname_div">
            <p>Sai Furniture</p>
          </div>
          <div id="menu_items">
            <ol>
              <li>Home</li>
              <li>Menu</li>
              <li>About</li>
              <li>Contact</li>
            </ol>
          </div>
          <div id="icons_list">
            <ol>
              <li>
                <span className="material-symbols-outlined">favorite</span>
              </li>
              <li>
                <span className="material-symbols-outlined">shopping_cart</span>
              </li>
              <li>
                <span className="material-symbols-outlined">person</span>
              </li>
            </ol>
          </div>
        </header>
      </div>
    </>
  );
};
