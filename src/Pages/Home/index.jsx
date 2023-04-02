import { Header } from "../../Components/Header";
import { BeambagComp } from "../../Components/beamBagComponent";
import { BedComp } from "../../Components/bedComponent";
import { ChairComp } from "../../Components/charComponent";
import { DressingComp } from "../../Components/dressingTableComponent";
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
      <BeambagComp/>
      <ChairComp/>
      <BedComp/>
      <DressingComp/>
    </>
  );
};
