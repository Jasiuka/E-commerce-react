import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
} from "../utils/firebase/firebase.util";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Functional component. Which wraps other components in which you want access to actual value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        CreateUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    // Šita funkcija returnina ta, kad jeigu vartotojas prisijungė,
    // tai pradėtu sekti/trackint/observint auth (vartotojo autentikacija), bet jeigu vartotojas atsijunge,
    // tai šita funkcija returnina ta, kad sekt nebereikia. Kol vartotojas vėl prisijunge ir triggerina šita efekta

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
