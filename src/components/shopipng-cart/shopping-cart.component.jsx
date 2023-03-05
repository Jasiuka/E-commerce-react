import { ReactComponent as CartIcon } from "../../assets/shopping-bag.svg";
// for redux
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.reducer";
import { useSelector } from "react-redux";
import { selectCartCount } from "../../store/cart/cart.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const ToggleDropdown = () => dispatch(setIsCartOpen(!isCartOpen));

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
