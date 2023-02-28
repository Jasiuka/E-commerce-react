import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { dataBase } from "../../utils/firebase/firebase.util";
import { doc, getDoc } from "firebase/firestore";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);
export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const emailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCSESS, user);
export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
export const signUpStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
  });
export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

/*
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCSESS: "SIGN_IN_SUCCSESS",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",
  
  */

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
