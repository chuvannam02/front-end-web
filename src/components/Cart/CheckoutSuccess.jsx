import { clearCart } from "../../redux/reducer/cartSlice";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
const CheckoutSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return (
    <>
      <h2>CheckoutSuccess</h2>
    </>
  );
};
export default CheckoutSuccess;
