import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import { Fragment, useContext } from "react";
import { signOutUser } from "../../utils/firebase/firebase.util";
import ShoppingCart from "../../components/shopipng-cart/shopping-cart.component";
import ShoppingCartDropdown from "../../components/shopipng-cart/shopping-cart-dropdown.component";
import { CartDropDownContext } from "../../contexts/cart-dropdown.context";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../../store/user/user.action";

const Navigation = () => {
  const dispatch = useDispatch();
  const { currentUser, userUsername, userImageUrl } = useSelector(
    (state) => state.user
  );
  const { isCartOpen } = useContext(CartDropDownContext);

  const signOutFromWeb = () => {
    signOutUser();
    dispatch(setUsername(""));
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
            <div className="user">
              {userUsername ? (
                <div className="user__image-box">
                  <img
                    className="user__image"
                    src={userImageUrl}
                    alt="user profile img"
                  />
                </div>
              ) : (
                <div className="user__no-user"></div>
              )}
              <span className="navigation__link navigation__username">
                {userUsername ? userUsername : ""}
              </span>
              <div className="user-box">
                <Link to="/profile" className="navigation__user">
                  PROFILE
                </Link>
                <span className="navigation__user" onClick={signOutFromWeb}>
                  SIGN OUT
                </span>
              </div>
            </div>
          ) : (
            <Link className="navigation__link" to="/sign-in">
              SIGN IN
            </Link>
          )}
          <ShoppingCart />
        </div>
        {isCartOpen && <ShoppingCartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
