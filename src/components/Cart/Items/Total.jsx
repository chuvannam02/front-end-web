import "./total.scss";
import { useSelector } from "react-redux";
import React from "react";
import { Button, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { Suspense } from "react";
const PayButton = React.lazy(() => import("../PayButton"));
function Total() {
  const cart = useSelector((state) => state.carts?.cart);
  let isLogin = useSelector((state) => state.auth?.login.isLogin);
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart?.forEach((item) => {
      totalQuantity += Number(item.quantity);
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <div className="total">
      <h2>Thanh toán</h2>
      <div>
        <p className="total__p">
          Tổng tạm tính của ({getTotal().totalQuantity} sản phẩm):{" "}
          <span>
            <strong> ${getTotal().totalPrice}</strong>
          </span>
        </p>
      </div>
      <div>
        <p className="total__p">
          Thành tiền
          <strong> ${getTotal().totalPrice}</strong>
        </p>
      </div>
      {user && isLogin ? (
        <>
          {" "}
          {/* <Button type="primary" size="large">
            Thanh toán
          </Button> */}
          <Suspense
            fallback={<Spin spinning={true} className="fullscreen-spin" />}
          >
            <PayButton cartItems={cart} />
          </Suspense>
        </>
      ) : (
        <>
          <Button type="primary" size="large">
            <NavLink to="/login" className="redirect_Login">
              Bạn cần đăng nhập để tiếp tục
            </NavLink>
          </Button>
        </>
      )}
    </div>
  );
}

export default Total;
