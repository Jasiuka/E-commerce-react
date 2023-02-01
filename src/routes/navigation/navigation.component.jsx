import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.util";
// import { getDoc, doc } from "firebase/firestore";
// import { dataBase } from "../../utils/firebase/firebase.util";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  /////////////////////////////////////////////////////////////
  // const [username, setUsername] = useState("");

  // useEffect(
  //   () => async () => {
  //     if (currentUser) {
  //       const docRef = doc(dataBase, "users", currentUser.uid);
  //       const userDoc = await getDoc(docRef);
  //       const data = userDoc.data();
  //       const username = data["displayName"];
  //       setUsername(username);
  //     }
  //     return;
  //   },
  //   [username, currentUser]
  // );
  // console.log(username);
  /////////////////////////////////////////////////////////////

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
            <div className="user">
              <span className="navigation__link navigation__username">
                HELLO
              </span>
              <div className="user-box">
                <Link to="/profile" className="navigation__user">
                  PROFILE
                </Link>
                <Link to="/user-settings" className="navigation__user">
                  SETTINGS
                </Link>
                <span className="navigation__user" onClick={signOutUser}>
                  SIGN OUT
                </span>
              </div>
            </div>
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
