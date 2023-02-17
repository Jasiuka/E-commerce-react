// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

// for redux
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  // for redux
  const categoriesMap = useSelector(selectCategories);

  //

  // const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="categories-preview">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview title={title} key={title} products={products} />
        );
      })}
    </div>
  );
};

export default CategoriesPreview;
