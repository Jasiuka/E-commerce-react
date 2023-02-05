import { CartDropDownContext } from "../../contexts/cart-dropdown.context";
import { useContext, useState } from "react";
const CheckoutItem = ({ product }) => {
  const { name, imageUrl, price, quantity, id } = product;
  const { cartItems, addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartDropDownContext);

  const addItemHandler = () => addItemToCart(product);
  const removeItemHandler = () => removeItemFromCart(product);
  const deleteItemHandler = () => deleteItemFromCart(product);

  return (
    <div className="checkout__item">
      <div className="checkout__item-image-box">
        <img className="checkout__item-image" src={imageUrl} />
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
