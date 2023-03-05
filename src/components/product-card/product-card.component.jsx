import Button from "../button/button.component";
// for redux
import { addItemToCart } from "../../store/cart/cart.reducer";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  // without redux toolkit
  const cartItems = useSelector(selectCartItems);
  // //////////
  const addProductToCart = () => dispatch(addItemToCart(product));

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
