import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

// for redux
// for thunk
// import { fetchCategoriesAsync } from "../../store/categories/categories.action";
//////
import {
  setCategoriesFailed,
  setCategoriesIsLoading,
} from "../../store/categories/categories.action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// For react query
// react query
import { useQuery } from "react-query";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { setCategoriesMap } from "../../store/categories/categories.action";
// ///////

const Shop = () => {
  const dispatch = useDispatch();

  const { isLoading, error, data } = useQuery("data", () =>
    getCategoriesAndDocuments()
  );

  useEffect(() => {
    if (data) {
      dispatch(setCategoriesMap(data));
    }
    if (error) {
      dispatch(setCategoriesFailed(error));
    }
    if (isLoading) {
      dispatch(setCategoriesIsLoading(true));
    }
  }, [data]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
