import Home from "./routes/home/home.component";
import SignPage from "./routes/sign-page/sign-page";
import Navigation from "./routes/navigation/navigation.component";
import Profile from "./routes/profile/profile.component";
import UserSettings from "./routes/settings/settings.component";
import { Routes, Route } from "react-router-dom";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="user-settings" element={<UserSettings />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
