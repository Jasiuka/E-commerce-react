import { useContext } from "react";
import Button from "../button/button.component";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context.jsx";
import CartItem from "./cart-item.component";
import { Link } from "react-router-dom";

const ShoppingCartDropdown = () => {
  const { cartItems } = useContext(CartDropDownContext);

  return (
    <div className="cart__dropdown">
      <div className="cart__items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="checkout" className="button">
        GO TO CHECKOUT
      </Link>
    </div>
  );
};

export default ShoppingCartDropdown;
