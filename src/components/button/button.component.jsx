const BUTTON_TYPE_CLASSES = {
  google: "google-sign-button",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`${buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""} button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
