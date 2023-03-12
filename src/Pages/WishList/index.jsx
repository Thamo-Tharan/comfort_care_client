import { Header } from "../../Components/Header"
import { WishListItem } from "../../Components/WishList";

export const WishListPage=()=>{
    const selectedColor = {
        Home: "",
        Menu: "",
        About: "",
        Contact: "",
        Wishlist: "active",
        Cart: "",
        Profile: "",
      };
    return(
        <>
        <Header selectedColor={selectedColor}/>
        <WishListItem/>
        </>
    )
}