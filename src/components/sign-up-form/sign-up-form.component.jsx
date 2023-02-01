import { useState } from "react";
import {
  UserCreateWithEmailAndPassword,
  CreateUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Susikuriam objekta, kadangi visi laukai yra panašaus pobudžio, todėl galima visus kintamuosius į objekta
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [message, setMessage] = useState("");

  //   console.log(formFields);

  const OnChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords does not match!");
      return;
    }

    try {
      const { user } = await UserCreateWithEmailAndPassword(email, password);

      await CreateUserDocumentFromAuth(user, { displayName });

      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setMessage("Email is already in use!");
      } else {
        console.log("User creation encountered an error", error);
      }
    }
  };

  return (
    <div className="forms__box">
      <h2>Don't have an account?</h2>
      <span>Sign Up using email and password</span>
      <p className="message">{message}</p>
      <form onSubmit={handleSubmit} className="forms__signup">
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={OnChangeHandler}
          value={displayName}
          name="displayName"
        />

        <FormInput
          label="Email"
          required
          type="email"
          onChange={OnChangeHandler}
          value={email}
          name="email"
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={OnChangeHandler}
          value={password}
          name="password"
        />

        <FormInput
          label="Confirm password"
          required
          type="password"
          onChange={OnChangeHandler}
          value={confirmPassword}
          name="confirmPassword"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
