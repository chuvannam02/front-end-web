import "./Item.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/reducer/cartSlice";
import React from "react";
import { debounce } from "lodash";
import { notification } from 'antd';
function Items({ id, title, image, price, quantity }) {
  const dispatch = useDispatch();
  const openNotification = () => {
    notification.open({
      message: 'Thông báo',
      description:
        'Đã thêm sản phẩm vào giỏ hàng thành công!',
    });
  };
  const defaultQuantity = quantity || 1;
  const debouncedAddToCart = debounce(() => {
    dispatch(
      addToCart({
        id,
        title,
        image,
        price,
        defaultQuantity: 1,
      })
    ),
      openNotification();
  }, 1000);
  return (
    <div className="item">
      <div className="item__info">
        <p className="item__title">{title}</p>
        <p className="item__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <img src={image} alt="item" />
      <button onClick={debouncedAddToCart}>Thêm vào giỏ hàng</button>
    </div>
  );
}

export default Items;
