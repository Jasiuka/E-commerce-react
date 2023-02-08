import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
  dataBase,
} from "../utils/firebase/firebase.util";
import { doc, getDoc } from "firebase/firestore";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userUsername: "",
  setUsername: () => {},
});

// const gettingUsername = async (user) => {
//   if (user) {
//     const userRef = doc(dataBase, "users", user.uid);
//     const userData = await getDoc(userRef);
//     const username =
//   }
//   return;
// };

// Functional component. Which wraps other components in which you want access to actual value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userUsername, setUsername] = useState("");

  const value = {
    currentUser,
    setCurrentUser,
    userUsername,
    setUsername,
  };

  // useEffect(() => {
  //   const getName = async () => {
  //     gettingUsername(currentUser);
  //   };
  //   getName();
  // }, [currentUser]);

  useEffect(() => {
    const gettingUsername = async () => {
      if (currentUser) {
        const userRef = doc(dataBase, "users", currentUser.uid);
        const userData = await getDoc(userRef);
        const name = userData.data().displayName;
        if (name.includes(" ")) {
          const username = name.slice(0, name.indexOf(" ")); // slice string to make it in one word (Name LastName => Name)
          setUsername(username);
        } else {
          setUsername(name);
        }
      }
      return;
    };
    gettingUsername();
  }, [currentUser]);

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
