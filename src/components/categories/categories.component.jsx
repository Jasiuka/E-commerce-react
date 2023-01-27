import Category from "../category-item/category-item.component";

const Categories = ({ categories }) => {
  return (
    <div className="categories">
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
