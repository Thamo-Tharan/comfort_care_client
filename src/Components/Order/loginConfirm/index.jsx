import Verified from "../../../Images/verified.png"
export const Loginconfirm=()=>{
    const userinfo = localStorage.getItem("userinfo");
    return(
        <div id="order_login_confm_root">
<div id="order_sub_login_conform">
<div id="order_login_image">
    <img src={Verified} alt=""/>
</div>
<p>Verified Sucessfully</p>
<p>{userinfo}</p>
</div>
        </div>
    )
}