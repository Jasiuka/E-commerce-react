import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./css/App.style.css";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./components/scroll-to-top/scroll-to-top.component";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { StripePromise } from "./utils/stripe/stripe.utils";

// React query
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
//  /////////////

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Elements stripe={StripePromise}>
              <ScrollToTop>
                <App />
              </ScrollToTop>
            </Elements>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
