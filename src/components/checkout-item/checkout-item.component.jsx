import { CartDropDownContext } from "../../contexts/cart-dropdown.context";
import { useContext, useState } from "react";
const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity, id } = product;
  const { cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartDropDownContext);

  return (
    <div className="checkout__item">
      <div>IMAGE</div>
      <h2>{name}</h2>
      <div className="checkout__quantity-box">
        <button onClick={() => removeItemFromCart(product)}>MINUS</button>
        <p>{quantity}</p>
        <button onClick={() => addItemToCart(product)}>PLUS</button>
      </div>
      <p>{price * quantity}</p>
      <button onClick={() => deleteItemFromCart(product)}>Remove</button>
    </div>
  );
};

export default CheckoutItem;
