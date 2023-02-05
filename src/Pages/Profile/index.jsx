import { Header } from "../../Components/Header";
import { ProfileLayout } from "../../Components/Profile/layout";
export const Profile = () => {
  const selectedColor = {
    Home: "",
    Menu: "",
    About: "",
    Contact: "",
    Wishlist: "",
    Cart: "",
    Profile: "active",
  };
  return (
    <>
      <Header selectedColor={selectedColor} />
      <ProfileLayout />
    </>
  );
};
