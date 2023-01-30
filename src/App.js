import Home from "./routes/home/home.component";
import SignPage from "./routes/sign-page/sign-page";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
  return (
    <div>
      <h1>Shop page</h1>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignPage />} />
      </Route>
    </Routes>
  );
};

export default App;
