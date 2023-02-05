import { Header } from "../../Components/Header"
import { WishtList } from "../../Components/WishtList";

export const WishtListPage=()=>{
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
        <WishtList/>
        </>
    )
}