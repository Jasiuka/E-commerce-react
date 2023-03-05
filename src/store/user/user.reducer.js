// import { USER_ACTION_TYPES } from "./user.types";
import { dataBase } from "../../utils/firebase/firebase.util";
import { doc, getDoc } from "firebase/firestore";
// for redux toolkit
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentUser: null,
  userUsername: "",
  userImageUrl: "",
  userEmail: "",
  userCreated: new Date(),
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setCurrentUserIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUserD(state, action) {
      state.userUsername = action.payload.displayName;
      state.userEmail = action.payload.email;
      state.userImageUrl = action.payload.imageUrl;
      state.userCreated = action.payload.createdAt;
    },
    setUsername(state, action) {
      state.userUsername = action.payload;
    },
    setUserImageUrl(state, action) {
      state.userImageUrl = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setUserD,
  setUserImageUrl,
  setUsername,
  setCurrentUserIsLoading,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

// helper
export const getUserData = async (user) => {
  if (user) {
    const userRef = doc(dataBase, "users", user.uid);
    const userData = await getDoc(userRef);
    return userData.data();
  } else {
    return;
  }
};

// export const userReducer = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCSESS:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         currentUser: null,
//       };

//     case USER_ACTION_TYPES.SET_USER_DATA:
//       return {
//         ...state,
//         ...payload,
//       };
//     case USER_ACTION_TYPES.SET_USER_NAME:
//       return {
//         ...state,
//         userUsername: payload,
//       };
//     case USER_ACTION_TYPES.SET_USER_IMAGE_URL:
//       return {
//         ...state,
//         userImageUrl: payload,
//       };

//     default:
//       return state;
//   }
// };
