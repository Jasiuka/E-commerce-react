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
import { setUserD } from "./store/user/user.reducer";

// default for without sagas:
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
} from "./utils/firebase/firebase.util";
import { setCurrentUser } from "./store/user/user.reducer";
import { getUserData } from "./store/user/user.reducer";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        CreateUserDocumentFromAuth(user).then((response) => {
          if (response) dispatch(setUserD(response));
        });

        getUserData(user).then((response) => {
          if (response) dispatch(setUserD(response));
        });
      }
      dispatch(setCurrentUser(user));
      navigate("/");
    });

    return unsubscribe;
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
