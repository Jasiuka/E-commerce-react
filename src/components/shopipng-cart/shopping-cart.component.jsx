import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context";
import { useContext } from "react";

const ShoppingCart = () => {
  const { isCartOpen, setIsCartOpen, cartCount } =
    useContext(CartDropDownContext);

  const ToggleDropdown = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="cart">
      <div className="cart__icon-box" onClick={ToggleDropdown}>
        <CartIcon className="cart__icon" />
        <span className="cart__count">{cartCount}</span>
      </div>
    </div>
  );
};

export default ShoppingCart;
