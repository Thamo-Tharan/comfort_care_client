import { Header } from "../../Components/Header";
import { Profilelayout } from "../../Components/Profile/layout";
export const Profile = () => {
  const selectedColor = {
    Home: "",
    Menu: "",
    About: "",
    Contact: "",
    whistlist: "",
    cart: "",
    profile: "active",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <Profilelayout />
    </>
  );
};
