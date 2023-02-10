import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as HouseIcon } from "../../assets/house.svg";
import { ReactComponent as EnvelopeIcon } from "../../assets/envelope.svg";
import { ReactComponent as CallIcon } from "../../assets/call.svg";

const Footer = () => {
  return (
    <Fragment>
      <Outlet />
      <div className="footer">
        <div className="footer__location-box">
          <div className="footer__location--contacts-box">
            <h2>Contacts</h2>
            <div className="contacts">
              <div className="footer__location--info-box">
                <span className="footer__location--info-label">
                  <HouseIcon className="footer__icon" />
                </span>
                <span className="footer__location--info-text">
                  Jonavos g., 44136 Kaunas
                </span>
              </div>
              <div className="footer__location--info-box">
                <span className="footer__location--info-label">
                  <CallIcon className="footer__icon" />
                </span>
                <span className="footer__location--info-text">+370000000</span>
              </div>
              <div className="footer__location--info-box">
                <span className="footer__location--info-label">
                  <EnvelopeIcon className="footer__icon" />
                </span>
                <span className="footer__location--info-text">
                  crwnclothing@info.com
                </span>
              </div>
            </div>
          </div>
          <div className="footer__location--location-container">
            <iframe
              className="footer__location-map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3969.898378616124!2d23.910495185646734!3d54.91492280836951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1slt!2slt!4v1675960462699!5m2!1slt!2slt"
              loading="lazy"
              title="location map"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
        <div className="footer__list">
          <div className="footer__list-navigation">
            {/* <h3 className="footer__list-title">Navigation</h3> */}
            <div>
              <Link className="footer__link" to="/">
                HOME
              </Link>
              <Link className="footer__link" to="shop">
                SHOP
              </Link>
              <Link className="footer__link" to="profile">
                PROFILE
              </Link>
              <Link className="footer__link" to="checkout">
                CHECKOUT
              </Link>
            </div>
          </div>
          <div className="footer__list-shop-navigation">
            {/* <h3 className="footer__list-title">Shop navigation</h3> */}
            <div>
              <Link className="footer__link" to="shop/hats">
                HATS
              </Link>
              <Link className="footer__link" to="shop/sneakers">
                SNEAKERS
              </Link>
              <Link className="footer__link" to="shop/jackets">
                JACKETS
              </Link>
              <Link className="footer__link" to="shop/womens">
                WOMENS
              </Link>
              <Link className="footer__link" to="shop/mens">
                MENS
              </Link>
            </div>
          </div>
        </div>
        <p className="copyright">
          Copyright &copy; 2023 Crown Clothing. All rights reserved.
        </p>
      </div>
    </Fragment>
  );
};

export default Footer;
