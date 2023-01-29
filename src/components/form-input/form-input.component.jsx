const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="input">
      <input {...otherProps} className="input__input" />
      <label
        className={`${otherProps.value.length ? "shrink" : ""} input__label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
