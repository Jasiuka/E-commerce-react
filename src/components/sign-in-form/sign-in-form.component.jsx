import {
  auth,
  SignInWithGoogleRedirect,
  SignInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";
import { getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
const defaultFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  ////////////////// Functionality of logging in ////////////////
  const signInRedirect = async () => {
    await SignInWithGoogleRedirect();
  };

  // Sign in with redirect
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
    },
    []
  );

  // sign in with popup

  //   const logGoogleUserWithPopUp = async () => {
  //     const { user } = await SignInWithGooglePopUp();
  //     await CreateUserDocumentFromAuth(user);
  //   };

  const HandleSubmit = async (event) => {
    event.preventDefault();

    try {
      await SignInUserWithEmailAndPassword(email, password);

      setFormField(defaultFields);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setMessage("User with this email doesn't exist");
      }
      if (error.code === "auth/wrong-password") {
        setMessage("Wrong password!");
      }

      console.log("Sign in encountered an error");
    }
  };

  //////////////////// Functionality of inputs //////////////////////

  const [formField, setFormField] = useState(defaultFields);
  const { email, password } = formField;
  const [message, setMessage] = useState("");

  const OnChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="forms__box">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <p className="message">{message}</p>
      <form className="forms__signin" onSubmit={HandleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={OnChangeHandler}
        />
        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={OnChangeHandler}
        />
        <div className="signin__buttons">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInRedirect}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
