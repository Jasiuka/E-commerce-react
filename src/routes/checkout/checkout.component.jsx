import CheckoutItem from "../../components/checkout-item/checkout-item.component";
// for redux
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

import PaymentForm from "../../components/payment-form/payment-form.component";
const Checkout = () => {
  const cartTotal = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout">
      {cartItems.length === 0 ? (
        <h3 className="checkout__message">You have no items in the cart!</h3>
      ) : (
        <div className="checkout__main">
          <div className="checkout__header">
            <p className="checkout__header-text checkout__header-text-img">
              Product
            </p>
            <p className="checkout__header-text checkout__header-text-description">
              Description
            </p>
            <p className="checkout__header-text checkout__header-text-quantity">
              Quantity
            </p>
            <p className="checkout__header-text checkout__header-text-price">
              Price
            </p>
            <p className="checkout__header-text checkout__header-text-remove">
              Remove
            </p>
          </div>
          <div className="checkout__items-box">
            {cartItems.map((item) => {
              return <CheckoutItem product={item} key={item.id} />;
            })}
          </div>
          {cartItems.length === 0 ? (
            <p></p>
          ) : (
            <p className="checkout__total">Total: ${cartTotal}</p>
          )}
        </div>
      )}
      {cartItems.length !== 0 ? <PaymentForm /> : <></>}
    </div>
  );
};

export default Checkout;
