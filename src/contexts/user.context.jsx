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
  userImageUrl: "",
  setUserImageUrl: () => {},
  userCreated: "",
  userEmail: "",
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
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userCreated, setUserCreated] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const value = {
    currentUser,
    setCurrentUser,
    userUsername,
    setUsername,
    userImageUrl,
    setUserImageUrl,
    userCreated,
    userEmail,
  };

  // useEffect(() => {
  //   const getName = async () => {
  //     gettingUsername(currentUser);
  //   };
  //   getName();
  // }, [currentUser]);

  useEffect(() => {
    const gettingUserData = async () => {
      if (currentUser) {
        const userRef = doc(dataBase, "users", currentUser.uid);
        const userData = await getDoc(userRef);
        // const name = userData.data().displayName;
        const { displayName, createdAt, imageUrl, email } = userData.data();
        if (displayName.includes(" ")) {
          const username = displayName.slice(0, displayName.indexOf(" ")); // slice string to make it in one word (Name LastName => Name)
          setUsername(username);
          setUserImageUrl(imageUrl);
          setUserCreated(createdAt);
          setUserEmail(email);
        } else {
          setUsername(displayName);
          setUserImageUrl(imageUrl);
          setUserCreated(createdAt);
          setUserEmail(email);
        }
      }
      return;
    };
    gettingUserData();
  }, [currentUser]);

  // useEffect(() => {
  //   const gettingImageUrl = async () => {
  //     if (currentUser) {
  //       const userRef = doc(dataBase, "users", currentUser.uid);
  //       const userData = await getDoc(userRef);
  //       const url = userData.data().imageUrl;
  //       setUserImageUrl(url);
  //     } else {
  //       return;
  //     }
  //   };
  //   gettingImageUrl();
  // }, [currentUser]);

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
