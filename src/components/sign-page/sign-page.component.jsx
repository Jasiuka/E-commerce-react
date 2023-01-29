import SignIn from "../../routes/sign-in/sign-in.component";
import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignPage = () => {
  return (
    <div className="forms">
      <SignIn />
      <SignUpForm />
    </div>
  );
};

export default SignPage;
