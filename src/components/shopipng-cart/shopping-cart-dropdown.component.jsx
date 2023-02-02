import Button from "../button/button.component";

const ShoppingCartDropdown = () => {
  return (
    <div className="cart__dropdown">
      <div className="cart__items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default ShoppingCartDropdown;
