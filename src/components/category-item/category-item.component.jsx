const Category = ({ category }) => {
  const { title } = category;
  return (
    <div className={`category category--${title}`}>
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
