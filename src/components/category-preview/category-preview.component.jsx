import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview">
      <Link to={title} className="category-preview__title button">
        {title}
      </Link>
      <div className="category-preview__products">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
