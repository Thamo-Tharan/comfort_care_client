import Verified from "../../../Images/verified.png";
export const LoginConfirm = () => {
  const userinfo = localStorage.getItem("userinfo");
  return (
    <div id="order_login_confirm_root">
      <div id="order_sub_login_conform">
        <div id="order_login_image">
          <img src={Verified} alt="" />
        </div>
        <p>Verified Successfully</p>
        <p>{userinfo}</p>
      </div>
    </div>
  );
};
