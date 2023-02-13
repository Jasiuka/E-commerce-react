import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
  dataBase,
} from "../utils/firebase/firebase.util";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

export const changeUserName = async (currentUser, newName) => {
  const userRef = doc(dataBase, "users", currentUser.uid);
  const newData = {
    displayName: newName,
  };
  await setDoc(userRef, newData, { merge: true }); // to merge document attributes or change if it exist
};

export const changeImageUrl = async (currentUser, newUrl) => {
  const userRef = doc(dataBase, "users", currentUser.uid);
  const newData = {
    imageUrl: newUrl,
  };
  await setDoc(userRef, newData, { merge: true });
};

export const getUserData = async (user) => {
  if (user) {
    const userRef = doc(dataBase, "users", user.uid);
    const userData = await getDoc(userRef);
    return userData.data();
  } else {
    return;
  }
};

// Functional component. Which wraps other components in which you want access to actual value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userUsername, setUsername] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const [userCreated, setUserCreated] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    if (!userData) {
      return;
    }
    userData.then((response) => {
      setUsername(response.displayName);
      setUserImageUrl(response.imageUrl);
      setUserEmail(response.email);
      setUserCreated(response.createdAt);
    });
  }, [currentUser]);

  // useEffect(() => {
  //   const getName = async () => {
  //     gettingUsername(currentUser);
  //   };
  //   getName();
  // }, [currentUser]);

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
        setUserData(getUserData(user));
      }
      setCurrentUser(user);
      setUserData(getUserData(user));
    });

    // Šita funkcija returnina ta, kad jeigu vartotojas prisijungė,
    // tai pradėtu sekti/trackint/observint auth (vartotojo autentikacija), bet jeigu vartotojas atsijunge,
    // tai šita funkcija returnina ta, kad sekt nebereikia. Kol vartotojas vėl prisijunge ir triggerina šita efekta

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
