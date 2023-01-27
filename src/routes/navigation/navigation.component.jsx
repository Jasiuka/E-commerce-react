import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Crwnlogo } from "../../assets/crown.svg";
import { Fragment } from "react";

const Navigation = () => {
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
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
