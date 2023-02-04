import { Header } from "../../Components/Header";
import { HomeImage } from "../../Components/homeImages";
import { SofaComp } from "../../Components/sofaComponent";

export const Home = () => {
  const selectedColor = {
    Home: "active",
    Menu: "",
    About: "",
    Contact: "",
    Wishlist: "",
    Cart: "",
    Profile: "",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <HomeImage />
      <SofaComp />
    </>
  );
};
