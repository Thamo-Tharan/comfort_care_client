import { Header } from "../../Components/Header";
import { Homeimage } from "../../Components/homeImages";
import { Sofacomp } from "../../Components/sofaComponent";

export const Home = () => {
  const selectedColor = {
    Home: "active",
    Menu: "",
    About: "",
    Contact: "",
    whistlist: "",
    cart: "",
    profile: "",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <Homeimage />
      <Sofacomp />
    </>
  );
};
