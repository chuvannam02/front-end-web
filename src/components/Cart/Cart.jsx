import "./Cart.scss";
import Total from "./Items/Total";
import CartItems from "./Items/CartItem";
import { useSelector } from "react-redux";
import React from "react";
import { Breadcrumb, Empty, Button } from "antd";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
function Cart() {
  const cart = useSelector((state) => state.carts?.cart);
  // console.log(cart);
  return (
    <>
      <br />
      <Breadcrumb
        style={{ margin: "10px 0 0 40px" }}
        items={[
          {
            title: <NavLink to="/">Trang chủ</NavLink>,
          },
          {
            title: "Giỏ hàng",
          },
        ]}
      />
      <div className="cart">
        <div className="cart__left">
          <div>
            <h3>Shopping Cart</h3>
            {cart?.map((item) => (
              <CartItems
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
            {cart.length === 0 && (
              <>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                  <p>Giỏ hàng chưa có sản phẩm nào</p>
                  <Button type="primary">
                    <NavLink to="/" className="btn-shopping">
                      Mua sắm ngay
                    </NavLink>
                  </Button>
                </Empty>
              </>
            )}
          </div>
        </div>

        <div className="cart__right">
          <Total />
        </div>
      </div>
    </>
  );
}

export default Cart;
