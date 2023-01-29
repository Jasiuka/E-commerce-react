import {
  auth,
  SignInWithGooglePopUp,
  CreateUserDocumentFromAuth,
  SignInWithGoogleRedirect,
  SignInUserWithEmailAndPassword,
  getUserData,
} from "../../utils/firebase/firebase.util";
import { getRedirectResult } from "firebase/auth";
import { useEffect, useState } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { getDoc } from "firebase/firestore";

const defaultFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  ////////////////// Functionality of logging in ////////////////

  // Sign in with redirect
  useEffect(
    () => async () => {
      const response = await getRedirectResult(auth);
      //   console.log("Response");
      //   console.log(response);
      if (response) {
        const { user } = response;
        // console.log("User");
        // console.log(user);
        await CreateUserDocumentFromAuth(user);
      }
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
      const { user } = await SignInUserWithEmailAndPassword(email, password);

      console.log(user);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("User not found");
      }
    }
  };

  //////////////////// Functionality of inputs //////////////////////

  const [formField, setFormField] = useState(defaultFields);
  const { email, password } = formField;

  const OnChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="forms__box">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
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
          <Button buttonType="google" onClick={SignInWithGoogleRedirect}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
