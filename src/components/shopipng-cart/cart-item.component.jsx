const CartItem = ({ cartItem }) => {
  const { name, price, quantity, imageUrl } = cartItem;
  return (
    <div className="cart-item">
      <div className="cart-item__image-box">
        <img src={imageUrl} className="cart-item__image" alt={name}></img>
      </div>
      <p className="cart-item__name">{name}</p>
      <span className="cart-item__price">{`${quantity} x $${price}`}</span>
    </div>
  );
};

export default CartItem;
