// import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

// for redux
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

// /////////////////

const CategoriesPreview = () => {
  // for redux
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCategoriesIsLoading);
  //
  // const { categoriesMap } = useContext(CategoriesContext);

  return isLoading ? (
    <Spinner />
  ) : (
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
