// for redux
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { removeItemFromCart } from "../../store/cart/cart.action";
import { deleteItemFromCart } from "../../store/cart/cart.action";
import { useDispatch } from "react-redux";

const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity, id } = product;
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, product));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, product));
  const deleteItemHandler = () =>
    dispatch(deleteItemFromCart(cartItems, product));

  return (
    <div className="checkout__item">
      <div className="checkout__item-image-box">
        <img className="checkout__item-image" src={imageUrl} alt={name} />
      </div>
      <h2 className="checkout__item-name">{name}</h2>
      <div className="checkout__quantity-box">
        <button onClick={removeItemHandler}>&lt;</button>
        <p>{quantity}</p>
        <button onClick={addItemHandler}>&gt;</button>
      </div>
      <p className="checkout__item-price">{price * quantity}</p>
      <button className="checkout__remove" onClick={deleteItemHandler}>
        &times;
      </button>
    </div>
  );
};

export default CheckoutItem;
