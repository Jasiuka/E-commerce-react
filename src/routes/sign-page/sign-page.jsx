import SignIn from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { useSelector } from "react-redux";

const SignPage = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? (
    <div className="forms">
      <h2 className="sign-in__page__signed-in-title">You already signed in!</h2>
    </div>
  ) : (
    <div className="forms">
      <SignIn />
      <SignUpForm />
    </div>
  );
};

export default SignPage;
