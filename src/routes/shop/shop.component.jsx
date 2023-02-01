import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="shop">
      {products.map(({ name, id, price, imageUrl }) => {
        return (
          <ProductCard key={id} name={name} price={price} imageUrl={imageUrl} />
        );
      })}
    </div>
  );
};

export default Shop;
