import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  const { title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);
  return (
    <div className={`category category--${title}`} onClick={onNavigateHandler}>
      <div
        className="category__background"
        style={{
          backgroundImage: `url(${category.imageUrl})`,
        }}
      ></div>
      <div className="category__text">
        <h2 className="category__text--title">{title}</h2>
        <p className="category__text--shop">Shop Now</p>
      </div>
    </div>
  );
};

export default Category;
