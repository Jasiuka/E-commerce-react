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
