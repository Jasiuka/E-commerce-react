import Home from "./routes/home/home.component";
import SignPage from "./routes/sign-page/sign-page";
import Navigation from "./routes/navigation/navigation.component";
import Profile from "./routes/profile/profile.component";
import { Routes, Route } from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Footer from "./components/footer/footer.component";

// for user
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserSession, setUserD } from "./store/user/user.action";

// default for without sagas:
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
  getCurrentUser,
} from "./utils/firebase/firebase.util";
import { setCurrentUser } from "./store/user/user.action";
import { getUserData } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // getCurrentUser().then((user) => {
    //   console.log(user);
    //   getUserData(user).then((response) => dispatch(setUserD(response)));
    // });
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Footer />}>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="sign-in" element={<SignPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
