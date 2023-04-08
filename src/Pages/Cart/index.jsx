import { Header } from "../../Components/Header";
import { Addtocarttem } from "../../Components/addToCart";

export const CartPage = () => {
  const selectedColor = {
    Home: "",
    Menu: "",
    About: "",
    Contact: "",
    Wishlist: "",
    Cart: "active",
    Profile: "",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <Addtocarttem />
    </>
  );
};
