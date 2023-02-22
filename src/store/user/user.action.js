import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { dataBase } from "../../utils/firebase/firebase.util";
import { doc, getDoc } from "firebase/firestore";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const setUserD = (
  data = {
    userUsername: "",
    userEmail: "",
    userImageUrl: "",
    userCreated: new Date(),
  }
) =>
  createAction(USER_ACTION_TYPES.SET_USER_DATA, {
    userUsername: data.displayName,
    userEmail: data.email,
    userImageUrl: data.imageUrl,
    userCreated: data.createdAt,
  });

export const setUsername = (username) =>
  createAction(USER_ACTION_TYPES.SET_USER_NAME, username);

export const setUserImageUrl = (url) =>
  createAction(USER_ACTION_TYPES.SET_USER_NAME, url);

// Helper
export const getUserData = async (user) => {
  if (user) {
    const userRef = doc(dataBase, "users", user.uid);
    const userData = await getDoc(userRef);
    return userData.data();
  } else {
    return;
  }
};
