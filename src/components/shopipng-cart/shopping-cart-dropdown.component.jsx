import { Fragment } from "react";
import CartItem from "./cart-item.component";
import { Link } from "react-router-dom";
// for redux
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
const ShoppingCartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const hideDropDown = () => dispatch(setIsCartOpen(false));

  return (
    <div
      className={`cart__dropdown ${
        cartItems.length ? "" : "cart__dropdown-empty"
      }`}
    >
      {cartItems.length ? (
        <Fragment>
          <div className="cart__items">
            {cartItems.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </div>
          <Link to="checkout" className="button" onClick={hideDropDown}>
            GO TO CHECKOUT
          </Link>
        </Fragment>
      ) : (
        <span className="cart__empty-message">Your cart is empty</span>
      )}
      {/* <div className="cart__items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Link to="checkout" className="button">
        GO TO CHECKOUT
      </Link> */}
    </div>
  );
};

export default ShoppingCartDropdown;
