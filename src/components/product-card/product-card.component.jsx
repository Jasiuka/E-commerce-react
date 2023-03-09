import Button from "../button/button.component";
// for redux
import { addItemToCart } from "../../store/cart/cart.reducer";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  // without redux toolkit
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
        <Button buttonType={"inverted"} onClick={addProductToCart}>
          <p>add to cart</p>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
