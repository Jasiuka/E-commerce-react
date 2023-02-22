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
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
} from "./utils/firebase/firebase.util";
import { setUserD } from "./store/user/user.action";
import { setCurrentUser } from "./store/user/user.action";
import { getUserData } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        CreateUserDocumentFromAuth(user);
        // dispatch(setUserD(getUserData(user).then((response) => response)));
        // getUserData(user).then((response) => dispatch(setUserD(response)));
      }
      dispatch(setCurrentUser(user));
      // console.log("GETTING DATA");
      // console.log(getUserData(user).then((response) => response));
      // dispatch(setUserD(getUserData(user).then((response) => response)));
      getUserData(user).then((response) => dispatch(setUserD(response)));
    });

    // Šita funkcija returnina ta, kad jeigu vartotojas prisijungė,
    // tai pradėtu sekti/trackint/observint auth (vartotojo autentikacija), bet jeigu vartotojas atsijunge,
    // tai šita funkcija returnina ta, kad sekt nebereikia. Kol vartotojas vėl prisijunge ir triggerina šita efekta

    return unsubscribe;
  }, [dispatch]);

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
