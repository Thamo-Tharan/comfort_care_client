import Verified from "../../../Images/verified.png";
export const LoginConfirm = (props) => {
  const { userName } = props;
  return (
    <div id="order_login_confirm_root">
      <div id="order_sub_login_conform">
        <div id="order_login_image">
          <img src={Verified} alt="" />
        </div>
        <p>Verified Successfully</p>
        <p>{userName}</p>
      </div>
    </div>
  );
};
