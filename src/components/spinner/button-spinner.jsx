const ButtonSpinner = ({ text }) => {
  return (
    <div className="button-spinner">
      <p className="button-spinner__text">{text}</p>
      <div className="button-spinner__spinner"></div>
    </div>
  );
};

export default ButtonSpinner;
