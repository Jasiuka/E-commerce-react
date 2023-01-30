import SignIn from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignPage = () => {
  return (
    <div className="forms">
      <SignIn />
      <SignUpForm />
    </div>
  );
};

export default SignPage;
