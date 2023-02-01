import Button from "../button/button.component";

const ProductCard = ({ name, price, imageUrl }) => {
  return (
    <div className="product-card">
      <img className="product-card__image" src={imageUrl} alt={name} />
      <div className="product-card__text">
        <h3 className="product-card__text--name">{name}</h3>
        <p className="product-card__text--price">{price}$</p>
      </div>
      <div className="product-card__button-box">
        <Button buttonType="inverted">Add to cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
