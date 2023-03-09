import ButtonSpinner from "../spinner/button-spinner";
const BUTTON_TYPE_CLASSES = {
  google: "google-sign-button",
  inverted: "inverted",
  payment: "payment",
  addToCart: "add-to-cart",
};

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  return (
    <button
      disabled={isLoading}
      className={`${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""} button`}
      {...otherProps}
    >
      {isLoading ? <ButtonSpinner text={"processing payment"} /> : children}
    </button>
  );
};

export default Button;
