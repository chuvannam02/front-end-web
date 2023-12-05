import "./CartItem.scss";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../../redux/reducer/cartSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { Button, Modal } from "antd";

function CartItems({ id, image, title, price, quantity = 0 }) {
  const dispatch = useDispatch();
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <div className="cartItem" key={id}>
      <img className="cartItem__image" src={image} alt="item" />
      <div className="cartItem__info">
        <p className="cartItem__title">{title}</p>
        <p className="cartItem__price">
          <small>$ </small>
          <strong>{price}</strong>
        </p>
        <div className="cartItem__incrDec">
          <button onClick={() => dispatch(decrementQuantity(id))}>-</button>
          <p>{quantity}</p>
          <button onClick={() => dispatch(incrementQuantity(id))}>+</button>
        </div>
        {/* <button
          className="cartItem__removeButton"
          onClick={() => dispatch(removeItem(id))}
        >
          Remove
        </button> */}
        <Button type="primary" onClick={() => setModal2Open(true)} danger>
          Xoá sản phẩm
        </Button>
        <Modal
          title="Chú ý"
          centered
          open={modal2Open}
          onOk={() => {
            setModal2Open(false);
            dispatch(removeItem(id));
          }}
          onCancel={() => setModal2Open(false)}
        >
          <p>Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?</p>
        </Modal>
      </div>
    </div>
  );
}

export default CartItems;
