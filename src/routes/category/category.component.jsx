import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

// for redux
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const Category = () => {
  // for redux
  const categoriesMap = useSelector(selectCategories);

  //

  const { category } = useParams();

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <div className="shop-category">
      <h2 className="shop-category__title">{category}</h2>
      <div className="shop-category__items">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
