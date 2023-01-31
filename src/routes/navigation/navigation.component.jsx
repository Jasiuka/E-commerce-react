import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import { Fragment, useContext } from "react";
import { UserContext, UsernameContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // const { currentUsername } = useContext(UsernameContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/">
          <Crwnlogo className="navigation__logo" />
        </Link>
        <div className="navigation__list">
          <Link to="shop" className="navigation__link">
            Shop
          </Link>
          {currentUser ? (
            <span className="navigation__link" onClick={signOutHandler}>
              {" "}
              SIGN OUT{" "}
            </span>
          ) : (
            <Link className="navigation__link" to="/sign-in">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
