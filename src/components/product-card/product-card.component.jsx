import Button from "../button/button.component";
import { useContext } from "react";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartDropDownContext);

  // const { cartCount, addCartCount } = useContext(CartDropDownContext); MANO

  const addProductToCart = () => {
    addItemToCart(product);

    //////////////////////// MY WAY TO UPDATE CART COUNT ///////////////////////////////////
    // addCartCount(cartCount + 1);
  };

  return (
    <div className="product-card">
      <img className="product-card__image" src={imageUrl} alt={name} />
      <div className="product-card__text">
        <h3 className="product-card__text--name">{name}</h3>
        <p className="product-card__text--price">{price}$</p>
      </div>
      <div className="product-card__button-box">
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
