import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => {
    return state.auth.login?.currentUser?.user;
  });
  const handleCheckout = async () => {
    axios
      .post("https://mern-stack-backend-kw0h.onrender.com/api/v1/create-checkout-session", {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <button className="btn btn-primary" onClick={handleCheckout}>
      Thanh toán
    </button>
  );
};
export default React.memo(PayButton);
