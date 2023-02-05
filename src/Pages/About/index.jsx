import React from "react";
import { Header } from "../../Components/Header";
import AboutUs from "../../Components/AboutUs";
const AboutPage = () => {
  const selectedColor = {
    Home: "",
    Menu: "",
    About: "active",
    Contact: "",
    Wishlist: "",
    Cart: "",
    Profile: "",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <AboutUs/>
    </>
  );
};

export default AboutPage;
