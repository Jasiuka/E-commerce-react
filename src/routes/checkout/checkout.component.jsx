import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";

const Checkout = () => {
  const { cartItems } = useContext(CartDropDownContext);

  return (
    <div className="checkout">
      <p className="checkout__table-text">Product</p>
      <p className="checkout__table-text">Description</p>
      <p className="checkout__table-text">Quantity</p>
      <p className="checkout__table-text">Price</p>
      <p className="checkout__table-text">Remove</p>
      {cartItems.map((item) => {
        return <CheckoutItem product={item} key={item.id} />;
      })}
    </div>
  );
};

export default Checkout;
