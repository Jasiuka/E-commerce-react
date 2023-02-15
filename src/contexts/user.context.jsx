import { createContext, useState, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  CreateUserDocumentFromAuth,
  dataBase,
} from "../utils/firebase/firebase.util";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createAction } from "../utils/reducer/reducer.utils";

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
  setUserCreated: () => {},
  setUserEmail: () => {},
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

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_USER_DATA: "SET_USER_DATA",
  SET_USER_NAME: "SET_USER_NAME",
  SET_USER_IMAGE_URL: "SET_USER_IMAGE_URL",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    case USER_ACTION_TYPES.SET_USER_NAME:
      return {
        ...state,
        userUsername: payload,
      };
    case USER_ACTION_TYPES.SET_USER_IMAGE_URL:
      return {
        ...state,
        userImageUrl: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
  userUsername: "",
  userImageUrl: "",
  userEmail: "",
  userCreated: new Date(),
};

// Functional component. Which wraps other components in which you want access to actual value
export const UserProvider = ({ children }) => {
  const [
    { currentUser, userUsername, userEmail, userImageUrl, userCreated },
    dispatch,
  ] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const setUserD = (data) => {
    dispatch(
      createAction(USER_ACTION_TYPES.SET_USER_DATA, {
        userUsername: data.displayName,
        userEmail: data.email,
        userImageUrl: data.imageUrl,
        userCreated: data.createdAt,
      })
    );
  };

  const setUsername = (username) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_USER_NAME, username));
  };
  const setUserImageUrl = (url) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_USER_NAME, url));
  };

  // REPLACING WITH REDUCERS
  // const [currentUser, setCurrentUser] = useState(null);
  // const [userUsername, setUsername] = useState("");
  // const [userImageUrl, setUserImageUrl] = useState("");
  // const [userCreated, setUserCreated] = useState("");
  // const [userEmail, setUserEmail] = useState("");

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
    setUserD,
    // setUserEmail,
    // setUserCreated,
  };

  useEffect(() => {
    if (!userData) {
      return;
    } else {
      userData.then((response) => {
        if (response) {
          setUserD(response);
        }
      });
    }
  }, [currentUser, userData]);

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
